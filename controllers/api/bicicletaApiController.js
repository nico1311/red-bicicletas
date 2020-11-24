const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = (req, res) => {
  res.status(200).json({
    bicicletas: Bicicleta.allBicis
  });
}

exports.bicicleta_get = (req, res) => {
  try {
    let bici = Bicicleta.findById(parseInt(req.params.id));
    res.status(200).json(bici);
  } catch (err) {
    res.status(404).end();
  }
}

exports.bicicleta_create = (req, res) => {
  let bici = new Bicicleta(parseInt(req.body.id), req.body.color, req.body.modelo);
  bici.ubicacion = [req.body.lat, req.body.lng];
  Bicicleta.add(bici);

  res.status(201).json(bici);
}

exports.bicicleta_update = (req, res) => {
  try {
    let biciAEditar = Bicicleta.findById(parseInt(req.params.id));

    if (req.body.id) biciAEditar.id = parseInt(req.body.id);
    if (req.body.color) biciAEditar.color = req.body.color;
    if (req.body.modelo) biciAEditar.modelo = req.body.modelo;
    if (req.body.lat) biciAEditar.ubicacion[0] = req.body.lat;
    if (req.body.lng) biciAEditar.ubicacion[1] = req.body.lng;

    res.status(200).json(biciAEditar);
  } catch (err) {
    res.status(404).end();
  }
}

exports.bicicleta_delete = (req, res) => {
  try {
    Bicicleta.findById(parseInt(req.params.id));
    Bicicleta.removeById(parseInt(req.params.id));

    res.status(204).end(); 
  } catch (err) {
    res.status(404).end();
  }

}
