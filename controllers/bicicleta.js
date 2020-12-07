const Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = (req, res) => {
  Bicicleta.allBicis((err, bicis) => {
    if (err) throw err;
    res.render('bicicletas', {
      siteName: 'Red Bicicletas',
      pageName: 'Bicicletas',
      bicis: bicis
    });
  });
}

exports.bicicleta_create_get = (req, res) => {
  res.render('bicicletas/create', {
    siteName: 'Red Bicicletas',
    pageName: 'Agregar bicicleta'
  });
}

exports.bicicleta_create_post = (req, res) => {
  const bici = new Bicicleta({
    biciId: req.body.id,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion: [
      req.body.lat.replace(/,/g, '.'),
      req.body.lng.replace(/,/g, '.')
    ]
  });

  Bicicleta.add(bici, (err) => {
    if (err) {
      console.error(err);
      res.render('error');
    }
    res.redirect('/bicicletas');
  });
}

exports.bicicleta_delete_post = (req, res) => {
  Bicicleta.removeById(parseInt(req.body.id), (err) => {
    if (err) throw err;
    res.redirect('/bicicletas');
  });
}

exports.bicicleta_update_get = (req, res) => {
  Bicicleta.findById(parseInt(req.params.id), (err, result) => {
    if (err) throw err;
    res.render('bicicletas/update', {
      siteName: 'Red Bicicletas',
      pageName: 'Editar bicicleta',
      bici: result
    });
  });
}

exports.bicicleta_update_post = (req, res) => {
  Bicicleta.findById(parseInt(req.params.id), (err, result) => {
    if (err) throw err;
    result.biciId = parseInt(req.body.id);
    result.color = req.body.color;
    result.modelo = req.body.modelo;
    result.ubicacion = [req.body.lat, req.body.lng];

    result.save((err) => {
      if (err) throw err;
      res.redirect('/bicicletas');
    });
  });
}
