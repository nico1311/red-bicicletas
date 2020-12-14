const express = require('express'),
  router = express.Router();
const UsuarioApiController = require('../../controllers/api/usuarioApiController');

router.get('/', UsuarioApiController.usuarios_list);
router.post('/create', UsuarioApiController.usuarios_create);
router.post('/reservar', UsuarioApiController.usuarios_reservar);

module.exports = router;
