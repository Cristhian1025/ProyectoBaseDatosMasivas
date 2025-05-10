const express = require('express');
const router = express.Router();
const promocionPlanController = require('../controllers/promocionPlanController');

// Rutas para la entidad Cliente
router.get('/', promocionPlanController.getPromocionPlan);
router.get('/:id', promocionPlanController.getPromocionPlanById);
router.post('/', promocionPlanController.createPromocionPlan);
router.put('/:id', promocionPlanController.updatePromocionPlan);
router.delete('/:id', promocionPlanController.deletePromocionPlan);
 
module.exports = router;
