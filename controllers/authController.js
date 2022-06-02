const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hashSync(req.body.password, 8),
        isAdmin: req.body.isAdmin,
    }

    await User.create(user).then(() => {
        res.send({ 
            code: 200,
            message: "User registered successfully!",
            data: user
        });
    }).catch(err => {
        res.status(500).send({ 
            code: 500,
            message: err.message,
            data: []
         });
    });
};

exports.signin = async (req, res) => {
    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ 
                code: 404,
                message: "User not found!",
                data: []
            });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                code: 401,
                message: "Password not valid!",
                data: []
            });
        }

        var token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.secret, {
            expiresIn: 86400 
        });

        res.status(200).send({
            code: 200,
            message: "success",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                accessToken: token
            }
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};