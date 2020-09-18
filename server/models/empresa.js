const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    pais: {
        type:String,
        required:true
    },
    celular: {
        type:String,
        required:true
    },
    direccion: {
        type:String,
        required:true
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    actualiza:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Empresas', empresaSchema);