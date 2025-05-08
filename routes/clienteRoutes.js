const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/ClienteController');

// Rutas para la entidad Cliente
router.get('/', clienteController.getClientes);
router.get('/:id', clienteController.getClienteById);
router.post('/', clienteController.createCliente);
router.put('/:id', clienteController.updateCliente);
router.delete('/:id', clienteController.deleteCliente);
 
module.exports = router;
