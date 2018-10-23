const express = require('express');
const app = express();
const Vehiculo = require('../models/vehiculo');

app.get('/vehiculo', function(req, res) {
  // let desde = req.query.desde || 0;
  // desde = Number(desde);

  // let limite = req.query.limite || 5;
  // limite = Number(limite);

  Vehiculo.find({})
    // .skip(desde)
    //   .limit(limite)
    .exec((err, vehiculos) => {
      if (err) {
        return res.status(400).json({ ok: false, err: err });
      }

      res.json({ ok: true, vehiculos: vehiculos });
    });
});

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

// app.put('/vehiculo/:id', function(req, res) {
//   let id = req.params.id;
//   let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

//     Vehiculo.findByIdAndUpdate(
//     id,
//     body,
//     { new: true, runValidators: true, context: 'query' },
//       (err, vehiculoDB) => {
//       if (err) {
//         return res.status(400).json({
//           ok: false,
//           err: err
//         });
//       }

//       res.json({ ok: true, vehiculo: vehiculoDB });
//     }
//   );
// });

// app.delete('/vehiculo/:id', function(req, res) {
//   let id = req.params.id;

//     Vehiculo.findByIdAndUpdate(
//       id,
//       { status: false },
//       (err, vehiculoBorrado) => {
//         if (err) {
//           return res.status(400).json({
//             ok: false,
//             err: err
//           });
//         }

//         if (!vehiculoBorrado) {
//           return res
//             .status(400)
//               .json({ ok: false, err: { message: 'Vehiculo no encontrado' } });
//         }

//         vehiculoBorrado.status = false;

//         res.json({ ok: true, vehiculo: vehiculoBorrado });
//       }
//     );
// });

module.exports = app;
