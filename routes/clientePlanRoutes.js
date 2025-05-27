const express = require('express');
const router = express.Router();
const clientePlanController = require('../controllers/clientePlanController');

router.get('/', clientePlanController.getClientePlan);

// Obtener solo las suscripciones activas de todos los clientes
router.get('/activas', clientePlanController.getSuscripcionesActivas);

// Obtener todas las suscripciones para un cliente específico
router.get('/cliente/:id_cliente', clientePlanController.getSuscripcionesByCliente);

// Obtener un plan de cliente específico por sus IDs (cliente y plan)
router.get('/:id_cliente/:id_plan', clientePlanController.getClientePlanById);

// Crear un nuevo plan de cliente (nueva suscripción)
router.post('/', clientePlanController.createClientePlan);

// Actualizar un plan de cliente existente (por ejemplo, cambiar la fecha de fin manualmente)
router.put('/:id_cliente/:id_plan', clientePlanController.updateClientePlan);

// Renovar una suscripción existente de un cliente por un número de meses
router.put('/:id_cliente/:id_plan/renovar', clientePlanController.renovarSuscripcion);

// Eliminar un plan de cliente específico
router.delete('/:id_cliente/:id_plan', clientePlanController.deleteClientePlan);

module.exports = router;