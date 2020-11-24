const express = require('express'),
  router = express.Router();
const BicicletaApiController = require('../../controllers/api/bicicletaApiController');

router.get('/', BicicletaApiController.bicicleta_list);
router.post('/create', BicicletaApiController.bicicleta_create);
router.get('/:id/', BicicletaApiController.bicicleta_get);
router.post('/:id/update', BicicletaApiController.bicicleta_update);
router.post('/:id/delete', BicicletaApiController.bicicleta_delete);

module.exports = router;
