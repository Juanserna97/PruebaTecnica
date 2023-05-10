const { Router } = require("express");
const router = Router();
const { addCategory, getCategories, updateCategoryById, deleteCategoryById } = require("../controllers/category_controller");
const {validateToken} = require("../controllers/token_controller")

//rutas para las categorías
router.get("/categories", getCategories);
router.post("/categories", validateToken , addCategory);
router.put("/categories/:categoryId", validateToken , updateCategoryById);
router.delete("/categories/:categoryId", validateToken , deleteCategoryById);

module.exports = router;
