const express = require('express');
const router = express.Router();

// Importar todas las rutas de las entidades

const gimnasioRoutes = require('./gimnasioRoutes');
const usuarioRoutes = require('./usuarioRoutes');  


const clienteRoutes = require('./clienteRoutes');

/*
const empleadoRoutes = require('./empleadoRoutes');
const medidasClienteRoutes = require('./medidasClienteRoutes');
const planRoutes = require('./planRoutes');
const promocionRoutes = require('./promocionRoutes');
const objetivoClienteRoutes = require('./objetivoClienteRoutes');  */



// Usar las rutas de las entidades, definiendo un prefijo para cada una


router.use('/gimnasios', gimnasioRoutes);

router.use('/usuarios', usuarioRoutes);   


router.use('/clientes', clienteRoutes);

/*
router.use('/empleados', empleadoRoutes);
router.use('/medidas-clientes', medidasClienteRoutes);
router.use('/planes', planRoutes);
router.use('/promociones', promocionRoutes);
router.use('/objetivos-clientes', objetivoClienteRoutes);
*/

module.exports = router;