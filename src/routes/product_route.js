const { Router } = require("express");
const router = Router();
const { addProduct, deleteProductById, getProducts ,updateProductById} = require("../controllers/product_controller");
const {validateToken} = require("../controllers/token_controller")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/'})

//rutas para los productos
router.get("/categories/:categoryId/products", getProducts);
router.post("/products", validateToken ,upload.single('image'), addProduct);
router.put("/products/:productId", validateToken ,upload.single('image'), updateProductById);
router.delete("/products/:productId", validateToken ,deleteProductById);

module.exports = router;