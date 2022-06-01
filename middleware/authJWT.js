const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            code: 403,
            message: "Authorization token not found!",
            data: []
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                code: 400,
                message: "Token Invalid!",
                data : []
            })
        }

        req.userId = decoded.id
        next()
    })
}

isAdmin = (req, res, next) => {
    token = req.headers["x-access-token"]
    id = jwt.verify(token, config.secret)['id']

    User.findByPk(id).then(user => {

        if (user){
            if (user.isAdmin){
                next()
                return
            }
        }

        res.status(401).send({
            code: 401,
            message: "Unauthorized",
            data: []
        });

        return
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;