const express = require('express');
const router = express.Router();
const gimnasioController = require('../controllers/gimnasioController');

router.get('/', gimnasioController.getGimnasios);
router.get('/:id', gimnasioController.getGimnasioById);
router.post('/', gimnasioController.createGimnasio);
router.put('/:id', gimnasioController.updateGimnasio);
router.delete('/:id', gimnasioController.deleteGimnasio);

module.exports = router;