const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')


let Schema = mongoose.Schema;

let vehiculoSchema = new Schema({
  modelo: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  matricula: {
    type: String,
    unique: true,
    required: [true, 'La matrícula es necesaria']
  }
});


vehiculoSchema.plugin(uniqueValidator, {
  message: 'El valor {PATH} debe de ser único'
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);