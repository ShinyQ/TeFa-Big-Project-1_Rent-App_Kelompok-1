const { verifyToken, isAdmin } = require("../middleware/authJWT");
const controller = require("../controllers/transactionController");

module.exports = (app) => {
    app.post("/transaction", [verifyToken], controller.addTransaction)
    app.get("/transaction", [verifyToken], controller.getTransaction)
    app.put("/transaction/:id", [verifyToken, isAdmin], controller.updateTransaction)
}