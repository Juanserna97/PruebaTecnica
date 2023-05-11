const productsSchema = require("../database/schemas/product_schema");

//funcion que trae los productos que pertenecen a una categoría desde mongo
const getProductsByCategory = async (categoryId) => {
    try {
        const products = await productsSchema.find({ category: categoryId });
        return products;
    } catch (error) {
        throw new Error("Products not found for category");
    }
};

//funcion que guarda las productos en mongo
async function insertProduct(params, img) {
    const product = new productsSchema({
        name: params.name,
        description: params.description,
        price: params.price,
        image: img.path, // Ruta del archivo de imagen cargado con Multer
        category: params.category,
    });
    const error = product.validateSync();
    if (error) {
        throw error;
    }
    await product.save().then(() => {
        console.log('New product saved to database');
    })
        .catch(err => {
            console.log('Error saving product to database', err);
        });
};

//función para actualiza una producto por id
async function updateProduct(id, update, img) {
    const product = await productsSchema.findById(id);
    if (!product) {
        throw new Error("Product not found");
    }
    product.name = update.name || product.name;
    product.description = update.description || product.description;
    product.price = update.price || product.price;
    product.category = update.category || product.category;
    if (img) {
        product.image = img.path; // Ruta del archivo de imagen cargado con Multer
    }
    const error = product.validateSync();
    if (error) {
        throw error;
    }
    const updatedProduct = await product.save();
    return updatedProduct;
}

// Función para eliminar una producto por ID
async function deleteProduct(productId) {
    const result = await productsSchema.deleteOne({ _id: productId });
    if (result.deletedCount === 1) {
        console.log("Product deleted from database");
    } else {
        console.log("Product not found in database");
    }
}

module.exports = {
    insertProduct, getProductsByCategory, updateProduct, deleteProduct
};
