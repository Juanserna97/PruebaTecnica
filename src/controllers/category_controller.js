const { insertCategory, getAllCategories, updateCategory, deleteCategory } = require("../services/category_service");

//Obtiene categorías
const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json({
            status: "OK",
            categories: categories
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//Agrega categorías
const addCategory = async (req, res) => {
    let params = req.body;
    try {
        await insertCategory(params);
        res.status(200).json({
            status: "OK",
            message: "Category has been added",
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//actualiza categorías
const updateCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const updates = req.body;
        const category = await updateCategory(categoryId,updates);
        res.status(200).json({
            status: "OK",
            message: "Category was updated",
            category: category
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//actualiza categorías
const deleteCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const category = await deleteCategory(categoryId);
        res.status(200).json({
            status: "OK",
            message: "Category was deleted",
            category: category
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

module.exports = {
    addCategory, getCategories, updateCategoryById,deleteCategoryById
};
