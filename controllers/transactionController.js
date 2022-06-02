const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../models");

const Item = db.item;
const User = db.user
const Transaction = db.transaction

exports.addTransaction = async (req, res) => {
    const token = req.headers["x-access-token"]
    const id = jwt.verify(token, config.secret)['id']
    const itemId = req.body.itemId

    await Item.findByPk(itemId).then(item => {
        if (item) {
            if (item.isAvailable) {
                const ownerId = item.userId
                const transaction = {
                    userId: id,
                    ownerId: ownerId,
                    itemId: itemId,
                    qty: req.body.qty,
                    status: "Pending",
                    deadline: req.body.deadline,
                }
        
                Transaction.create(transaction).then(() => {
                    res.send({
                        code: 200,
                        message: "Transaction has been added successfully!",
                        data: transaction
                    })

                    return
                }).catch(err => {
                    res.status(500).send({
                        code: 500,
                        message: err.message,
                        data: []
                    })

                    return
                })
            } else {
                res.status(400).send({
                    code: 400,
                    message: "Item not available!",
                    data: []
                })

                return  
            } 
        } else {
            res.status(404).send({
                code: 404,
                message: "Item not found!",
                data: []
            })

            return 
        }      
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        })

        return
    })
}

exports.getTransaction = async (req, res) => {
    const token = req.headers["x-access-token"]
    const verify = jwt.verify(token, config.secret)

    const id = verify['id']
    const isAdmin = verify['isAdmin']

    relations = [
        {
            model: User,
            as: 'owner',
            attributes: ['id', 'name']
        },
        {
            model: User,
            as: 'user',
            attributes: ['id', 'name']
        },
        {
            model: Item,
            as: 'item',
            attributes: ['id', 'name', 'price']
        }
    ]

    let condition = { userId: id }

    if (isAdmin){
        condition = { ownerId: id }
    }

    Transaction.findAll({
        include: relations,
        where: condition,
    }).then(data => {
        res.status(200).send({
            code: 200,
            message: "success",
            data
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
}

exports.updateTransaction  = async (req, res) => {
    const token = req.headers["x-access-token"]
    const id = jwt.verify(token, config.secret)['id']

    const transaction_id = req.params.id
    const { body } = req

    await Transaction.update(body, {
        where: {
            id: transaction_id,
            ownerId: id
        }
    }).then((data) => {
        if (data[0]) {
            res.send({
                code: 200,
                message: "Transaction has been updated successfully!",
                data: body
            })
            return
        }

        res.send({
            code: 404,
            message: "Transaction not found!",
            data: []
        })
        return
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        })
    })
}