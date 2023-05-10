const categoriesSchema = require("../database/schemas/category_schema");

//funcion que trae las categorías desde mongo
async function getAllCategories() {
    const allCategories = await categoriesSchema.find();
    return allCategories;
}

//funcion que guarda las categorías en mongo
async function insertCategory(params) {
    const category = new categoriesSchema(params);
    const error = category.validateSync();
    if (error) {
        throw error;
    }
    await category.save().then(() => {
        console.log('New category saved to database');
    })
        .catch(err => {
            console.log('Error saving category to database', err);
        });
}

//función para actualiza una categoría por id
async function updateCategory(id, update) {
    const updatedCategory = await categoriesSchema.findByIdAndUpdate(
        id,
        update,
        {
            new: true, // devuelve el documento actualizado en lugar del original
            runValidators: true, // valida los nuevos datos según el esquema
        }
    );
    if (!updatedCategory) {
        throw new Error("category not found");
    }
    return updatedCategory;
}

// Función para eliminar una categoría por ID
async function deleteCategory(categoryId) {
    const result = await categoriesSchema.deleteOne({ _id: categoryId });
    if (result.deletedCount === 1) {
        console.log("Category deleted from database");
    } else {
        console.log("Category not found in database");
    }
}

module.exports = {
    insertCategory, getAllCategories, updateCategory, deleteCategory
};
