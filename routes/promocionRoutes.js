const express = require('express');
const router = express.Router();
const promocionController = require('../controllers/promocionController');

// Rutas para la entidad Promocion
router.get('/', promocionController.getPromociones);
router.get('/:id', promocionController.getPromocionById);
router.post('/', promocionController.createPromocion);
router.put('/:id', promocionController.updatePromocion);
router.delete('/:id', promocionController.deletePromocion);

module.exports = router;
