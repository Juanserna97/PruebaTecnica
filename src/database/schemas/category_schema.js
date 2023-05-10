const mongoose = require('mongoose');

//esquema de la colección de las categorías
const categoriesSchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    }

})

module.exports = mongoose.model('categorias', categoriesSchema)