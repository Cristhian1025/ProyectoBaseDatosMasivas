const express = require('express');
const router = express.Router();

// Importar todas las rutas de las entidades

const gimnasioRoutes = require('./gimnasioRoutes');
const usuarioRoutes = require('./usuarioRoutes');  
const clienteRoutes = require('./clienteRoutes');
const planRoutes = require('./planRoutes');
const empleadoRoutes = require('./empleadoRoutes');
const medidasClienteRoutes = require('./medidasClienteRoutes');
const objetivoClienteRoutes = require('./objetivoClienteRoutes'); 
const promocionRoutes = require('./promocionRoutes');
const promocionPlanRoutes = require('./promocionPlanRoutes');
const clientePlanRoutes = require('./clientePlanRoutes');
const instructorRoutes = require('./instructorRoutes');

// Usar las rutas de las entidades, definiendo un prefijo para cada una

router.use('/gimnasios', gimnasioRoutes);
router.use('/usuarios', usuarioRoutes);   
router.use('/clientes', clienteRoutes);
router.use('/planes', planRoutes);
router.use('/empleados', empleadoRoutes);
router.use('/medidas-clientes', medidasClienteRoutes);
router.use('/objetivos-clientes', objetivoClienteRoutes);
router.use('/promociones', promocionRoutes);
router.use('/promocionPlan', promocionPlanRoutes);
router.use('/clientePlan', clientePlanRoutes);
router.use('/instructores', instructorRoutes);

module.exports = router;