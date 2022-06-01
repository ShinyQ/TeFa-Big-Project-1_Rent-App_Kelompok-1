const db = require("../models");
const User = db.user;

checkDuplicateEmail = async (req, res, next) => {
    await User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                code: 400,
                message: "Email has been taken!",
                data: []
            });
        }
        
        next();
    }).catch(err => {
        res.status(500).send({
            code: 500,
            message: err.message,
            data: []
        });
    });
};

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifySignUp;