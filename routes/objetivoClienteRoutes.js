const express = require('express');
const router = express.Router();
const objetivoClienteController = require('../controllers/objetivoClienteController');

// Rutas para la entidad ObjetivoCliente

router.get('/', objetivoClienteController.getObjetivoCliente);
router.get('/:id', objetivoClienteController.getObjetivoClienteById);
router.post('/', objetivoClienteController.createObjetivoCliente);
router.put('/:id', objetivoClienteController.updateObjetivoCliente);
router.delete('/:id', objetivoClienteController.deleteObjetivoCliente);

module.exports = router;
