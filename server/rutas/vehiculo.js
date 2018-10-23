const express = require('express');
const app = express();
const _ = require('lodash');
const Vehiculo = require('../models/vehiculo');


// Obtiene los registros de la BD

app.get('/vehiculo', function(req, res) {
  // let desde = req.query.desde || 0;
  // desde = Number(desde);

  // let limite = req.query.limite || 5;
  // limite = Number(limite);

  Vehiculo.find({})
    // .skip(desde)
    //   .limit(limite)
    .exec((err, vehiculo) => {
      if (err) {
        return res.status(400).json({ ok: false, err: err });
      }

      res.json({ ok: true, vehiculo: vehiculo });
    });
});


// Crea un registro en la BD

app.post('/vehiculo', function(req, res) {
  let body = req.body;

  let vehiculo = new Vehiculo({
    modelo: body.modelo,
    matricula: body.matricula
  });

  vehiculo.save((err, vehiculoDB) => {
    if (err) {
      return res.status(400).json({ ok: false, err: err });
    } else {
      res.json({ ok: true, vehiculo: vehiculoDB });
    }
  });
});


// Actualiza un registro de la BD

app.put('/vehiculo/:id', function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ['modelo', 'matricula']);

    Vehiculo.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: 'query' },
      (err, vehiculoDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err: err
        });
      }

      res.json({ ok: true, vehiculo: vehiculoDB });
    }
  );
});


// Borra un registro de la BD

app.delete('/vehiculo/:id', function(req, res) {
  let id = req.params.id;

    Vehiculo.findByIdAndDelete(
      id,
      (err, vehiculoBorrado) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err: err
          });
        }

        if (!vehiculoBorrado) {
          return res
            .status(400)
              .json({ ok: false, err: { message: 'Vehiculo no encontrado' } });
        }

        res.json({ ok: true, vehiculo: vehiculoBorrado });
      }
    );
});

module.exports = app;
