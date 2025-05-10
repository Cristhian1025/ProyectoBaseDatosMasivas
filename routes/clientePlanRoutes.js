const express = require('express');
const router = express.Router();
const clientePlanController = require('../controllers/clientePlanController');

// Rutas para la entidad Cliente
router.get('/', clientePlanController.getClientePlan);
router.get('/:id', clientePlanController.getClientePlanById);
router.post('/', clientePlanController.createClientePlan);
router.put('/:id', clientePlanController.updateClientePlan);
router.delete('/:id', clientePlanController.deleteClientePlan);
 
module.exports = router;