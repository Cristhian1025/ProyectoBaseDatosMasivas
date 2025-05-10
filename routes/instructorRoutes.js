const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

// Rutas para la entidad Cliente
router.get('/', instructorController.getInstructores);
router.get('/:id', instructorController.getInstructorById);
router.post('/', instructorController.createInstructor);
router.put('/:id', instructorController.updateInstructor);
router.delete('/:id', instructorController.updateInstructor);
 
module.exports = router;