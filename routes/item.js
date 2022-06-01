const { verifyToken, isAdmin } = require("../middleware/authJWT");
const controller = require("../controllers/itemController");

module.exports = (app) => {
    app.post("/item", [verifyToken, isAdmin], controller.addItem)
    app.get("/item", [verifyToken], controller.getItem);
    app.put("/item/:id", [verifyToken, isAdmin], controller.updateItem);
    app.delete("/item/:id", [verifyToken, isAdmin], controller.deleteItem);
};