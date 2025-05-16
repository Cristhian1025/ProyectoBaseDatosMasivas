const express = require('express');
const router = express.Router();
const clientePlanController = require('../controllers/clientePlanController');

// Rutas para la entidad Cliente
router.get('/', clientePlanController.getClientePlan);
router.get('/:id_cliente/:id_plan', clientePlanController.getClientePlanById);
router.post('/', clientePlanController.createClientePlan);
router.put('/:id_cliente/:id_plan', clientePlanController.updateClientePlan);
router.delete('/:id_cliente/:id_plan', clientePlanController.deleteClientePlan);
 
module.exports = router;