const mongoose = require('mongoose');

//esquema de la colección de los productos
const productsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    }

})

module.exports = mongoose.model('productos', productsSchema)