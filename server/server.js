const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config');
const path = require('path');

const mongoose = require('mongoose');
const colors = require('colors');

app.use(express.static(__dirname + '/comutel/src'))



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar la carpeta Public
app.use(express.static(path.resolve(__dirname, '../comutel-app/src')));

// CRUD de Vehiculo
app.use(require('./rutas/vehiculo'));


mongoose.connect(
  process.env.URLBD,
  (err, res) => {
    console.log(process.env.URLBD);
    if (err) throw err;

    console.log('Base de datos ' + 'ONLINE'.green);
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`);
});
