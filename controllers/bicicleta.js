const Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = (req, res) => {
  res.render('bicicletas', {
    siteName: 'Red Bicicletas',
    pageName: 'Bicicletas',
    bicis: Bicicleta.allBicis
  });
}

exports.bicicleta_create_get = (req, res) => {
  res.render('bicicletas/create', {
    siteName: 'Red Bicicletas',
    pageName: 'Agregar bicicleta'
  });
}

exports.bicicleta_create_post = (req, res) => {
  let bici = new Bicicleta(parseInt(req.body.id), req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici);

  res.redirect('/bicicletas');
}

exports.bicicleta_delete_post = (req, res) => {
  Bicicleta.removeById(parseInt(req.body.id));

  res.redirect('/bicicletas');
}

exports.bicicleta_update_get = (req, res) => {
  let biciAEditar = Bicicleta.findById(parseInt(req.params.id));

  res.render('bicicletas/update', {
    siteName: 'Red Bicicletas',
    pageName: 'Editar bicicleta',
    bici: biciAEditar
  });
}

exports.bicicleta_update_post = (req, res) => {
  let biciAEditar = Bicicleta.findById(parseInt(req.params.id));

  biciAEditar.id = parseInt(req.body.id);
  biciAEditar.color = req.body.color;
  biciAEditar.modelo = req.body.modelo;
  biciAEditar.ubicacion = [req.body.lat, req.body.lng];

  res.redirect('/bicicletas');
}
