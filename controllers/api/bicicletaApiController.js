const Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = (req, res) => {
  Bicicleta.allBicis((err, bicis) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(200).json({
      bicicletas: bicis
    });
  });
}

exports.bicicleta_get = (req, res) => {
  Bicicleta.findById(parseInt(req.params.id), (err, result) => {
    if (err) return res.status(err.name === 'DocumentNotFoundError' ? 404: 500).end();
    res.status(200).json(result);
  });
}

exports.bicicleta_create = (req, res) => {
  const bici = new Bicicleta({
    biciId: req.body.id,
    color: req.body.color,
    modelo: req.body.modelo,
    ubicacion: [
      req.body.lat.replace(/,/g, '.'),
      req.body.lng.replace(/,/g, '.')
    ]
  });

  Bicicleta.add(bici, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(201).json(result);
  });
}

exports.bicicleta_update = (req, res) => {
  Bicicleta.findById(parseInt(req.params.id), (err, result) => {
    if (err) return res.status(err.name === 'DocumentNotFoundError' ? 404: 500).end();
    if (req.body.id) result.biciId = parseInt(req.body.id);
    if (req.body.color) result.color = req.body.color;
    if (req.body.modelo) result.modelo = req.body.modelo;
    if (req.body.lat) result.ubicacion[0] = req.body.lat;
    if (req.body.lng) result.ubicacion[1] = req.body.lng;

    result.save((err) => {
      if (err) {
        console.error(err);
        return res.status(500).end();
      }
      res.status(200).json(result);
    });
  });
}

exports.bicicleta_delete = (req, res) => {
  Bicicleta.removeById(parseInt(req.params.id), (err, result) => {
    if (err) return res.status(err.name === 'DocumentNotFoundError' ? 404: 500).end();
    res.status(204).end();
  });
}
