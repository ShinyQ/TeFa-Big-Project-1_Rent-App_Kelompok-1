const db = require("../models");
const Category = db.category;

exports.addCategory = async (req, res) => {
    const category = {
        name: req.body.name,
    }

    await Category.create(category).then(() => {
        res.send({
            code: 200,
            message: "Category has been added successfully!",
            data: category
        });
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        });
    });
};


exports.getCategory = async (req, res) => {
    await Category.findAll().then(data => {
        res.status(200).send({
            code: 200,
            message: "success",
            data
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.updateCategory = async (req, res) => {
    const { body } = req

    await Category.update(body, {
        where: {
            id: req.params.id,
        }
    }).then((data) => {
        if (data[0]) {
            res.send({
                code: 200,
                message: "Category has been updated successfully!",
                data: body
            })

            return
        }

        res.send({
            code: 404,
            message: "Category not found!",
            data: []
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        });
    });
};

exports.deleteCategory = async (req, res) => {
    await Category.destroy({
        where: {
            id: req.params.id
        }
    }).then((data) => {
        if (data) {
            res.send({
                code: 200,
                message: "Category has been deleted successfully!",
                data: []
            })

            return
        }

        res.send({
            code: 404,
            message: "Category not found!",
            data: []
        })
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        });
    });
};