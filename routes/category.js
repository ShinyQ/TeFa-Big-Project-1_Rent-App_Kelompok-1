const { verifyToken, isAdmin } = require("../middleware/authJWT");
const controller = require("../controllers/categoryController");

module.exports = (app) => {
    app.post("/category", [verifyToken, isAdmin], controller.addCategory)
    app.get("/category", [verifyToken], controller.getCategory);
    app.put("/category/:id", [verifyToken, isAdmin], controller.updateCategory);
    app.delete("/category/:id", [verifyToken, isAdmin], controller.deleteCategory);
};