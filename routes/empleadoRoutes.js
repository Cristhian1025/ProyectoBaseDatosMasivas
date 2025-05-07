const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/empleadoController');

// Rutas para la entidad Cliente
router.get('/', empleadoController.getEmpleado);
router.get('/:id', empleadoController.getEmpleadoById);
router.post('/', empleadoController.createEmpleado);
router.put('/:id', empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
