const { Router } = require("express");
const router = Router();
const { addCategory, getCategories, updateCategoryById, deleteCategoryById } = require("../controllers/category_controller");

//rutas para las categorías
router.get("/categories", getCategories);
router.post("/categories", addCategory);
router.put("/categories/:categoryId", updateCategoryById);
router.delete("/categories/:categoryId", deleteCategoryById);

module.exports = router;
