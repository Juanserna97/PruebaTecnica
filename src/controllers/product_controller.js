const { insertProduct, getProductsByCategory, updateProduct, deleteProduct} = require("../services/product_service");

//Obtiene productos
const getProducts = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await getProductsByCategory(categoryId);
        res.status(200).json({
            status: "OK",
            products: products
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//Agrega productos
const addProduct = async (req, res) => {
    img = req.file;
    let params = req.body;
    try {
        await insertProduct(params,img);
        res.status(200).json({
            status: "OK",
            message: "Product has been added",
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//actualiza productos
const updateProductById = async (req, res) => {
    try {
        img = req.file;
        const productId = req.params.productId;
        const updates = req.body;
        const product = await updateProduct(productId,updates,img);
        res.status(200).json({
            status: "OK",
            message: "product was updated",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//actualiza productos
const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await deleteProduct(productId);
        res.status(200).json({
            status: "OK",
            message: "product was deleted",
            product: product
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

module.exports = {
    getProducts,addProduct,updateProductById,deleteProductById
};
