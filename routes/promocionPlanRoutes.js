const express = require('express');
const router = express.Router();
const promocionPlanController = require('../controllers/promocionPlanController');

// Rutas para la entidad Cliente
router.get('/', promocionPlanController.getPromocionPlan);
router.get('/:id_promocion/:id_plan', promocionPlanController.getPromocionPlanById);
router.post('/', promocionPlanController.createPromocionPlan);
router.put('/:id_promocion/:id_plan', promocionPlanController.updatePromocionPlan);
router.delete('/:id_promocion/:id_plan', promocionPlanController.deletePromocionPlan);
 
module.exports = router;
