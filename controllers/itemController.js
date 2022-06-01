const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const db = require("../models");

const Item = db.item;
const Category = db.category;
const User = db.user

exports.addItem = async (req, res) => {
    token = req.headers["x-access-token"]
    id = jwt.verify(token, config.secret)['id']

    const item = {
        userId: id,
        categoryId: req.body.categoryId,
        name: req.body.name,
        price: req.body.price,
        isAvailable: 1,
    }

    await Item.create(item).then(() => {
        res.send({
            code: 200,
            message: "Item has been added successfully!",
            data: item
        });
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        })
    })
};


exports.getItem = async (req, res) => {
    await Item.findAll({
        include: [
            {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name']
            },
        ],
        where: {
            isAvailable: 1,
        },
    }).then(data => {
        res.status(200).send({
            code: 200,
            message: "success",
            data
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })
};

exports.updateItem = async (req, res) => {
    const token = req.headers["x-access-token"]
    const id = jwt.verify(token, config.secret)['id']

    const item_id = req.params.id
    const { body } = req

    await Item.update(body, {
        where: {
            id: item_id,
            userId: id
        }
    }).then((data) => {
        if (data[0]){
            res.send({
                code: 200,
                message: "Item has been updated successfully!",
                data: body
            })
        }

        res.send({
            code: 404,
            message: "Item not found!",
            data: []
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        })
    })
};

exports.deleteItem = async (req, res) => {
    const token = req.headers["x-access-token"]
    const id = jwt.verify(token, config.secret)['id']
    const item_id = req.params.id

    await Item.destroy({
        where: {
            id: item_id,
            userId: id
        }
    }).then((data) => {
        if (data) {
            res.send({
                code: 200,
                message: "Item has been deleted successfully!",
                data: []
            })
        }

        res.send({
            code: 404,
            message: "Item not found!",
            data: []
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        })
    })
};