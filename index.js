const express = require('express');
const cors = require('cors');
const connection = require('./database/conexion');
const path = require('path');
const app = express();

// Importar Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173' }));

// Definir puerto
const PORT = 3000;

// Configurar rutas
const routes = require('./routes');
app.use('/api', routes);

// API de prueba
app.get('/api/prueba', (req, res) => {
    res.status(200).json({
        message: 'API funcionando correctamente',
        port: PORT,
        status: 'success'
    });
});

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejo del cierre de la aplicación
process.on('SIGINT', async () => {
    console.log("Cerrando el servidor...");
    try {
        await connection.end();
        console.log("Conexión a la base de datos cerrada.");
        process.exit(0);
    } catch (error) {
        console.error("Error al cerrar la conexión a la base de datos:", error);
        process.exit(1);
    }
});