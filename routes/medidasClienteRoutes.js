const express = require('express');
const router = express.Router();
const medidasClienteController = require('../controllers/medidasClienteController');

// Rutas para la entidad MedidasCliente
router.get('/', medidasClienteController.getMedidasClientes);
router.get('/:id', medidasClienteController.getMedidasClienteById);
router.post('/', medidasClienteController.createMedidasCliente);
router.put('/:id', medidasClienteController.updateMedidasCliente);
router.delete('/:id', medidasClienteController.deleteMedidasCliente);

module.exports = router;