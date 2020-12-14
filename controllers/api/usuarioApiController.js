const Usuario = require('../../models/usuario');

exports.usuarios_list = (req, res) => {
  Usuario.find({}, (err, usuarios) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(200).json({
      usuarios: usuarios
    });
  });
}


exports.usuarios_create = (req, res) => {
  const usuario = new Usuario({
    nombre: req.body.nombre
  });

  usuario.save((err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).end();
    }
    res.status(201).json(result);    
  });
}


exports.usuarios_reservar = (req, res) => {
  Usuario.findById(req.body.id, (err, usuario) => {
    if (err) return res.status(err.name === 'DocumentNotFoundError' ? 404: 500).end();
    console.log(usuario);
    usuario.reservar(req.body.biciId, req.body.desde, req.body.hasta, (err) => {
      if (err) return res.status(err.name === 'DocumentNotFoundError' ? 404: 500).end();
      console.log('Reservada');
      res.status(204).end();
    });
  });

}