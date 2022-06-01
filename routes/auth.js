const { verifySignUp } = require("../middleware");
const controller = require("../controllers/authController");

module.exports = (app) => {
    app.post("/auth/register", [verifySignUp.checkDuplicateEmail], controller.signup)
    app.post("/auth/login", controller.signin)
};