const { verifyToken } = require("../middleware/authJWT");
const controller = require("../controllers/userController");

module.exports = (app) => {
    app.get("/auth/user", [verifyToken], controller.profile)
    app.get("/auth/logout", [verifyToken], controller.logout);
};