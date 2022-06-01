const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");

exports.profile = async (req, res) => {
    token = req.headers["x-access-token"]
    id = jwt.verify(token, config.secret)['id']

    await User.findOne({
        where: {
            id: id
        }
    }).then(user => {        
        res.status(200).send({
            code: 200,
            message: "success",
            data : {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

exports.logout = async (req, res) => {
    token = req.headers["x-access-token"]
    id = jwt.verify(token, config.secret)['id']

    await User.findOne({
        where: {
            id: id
        }
    }).then(_ => {
        res.status(200).send({
            code: 200,
            message: "success",
            data: []
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};