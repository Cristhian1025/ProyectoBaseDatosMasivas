const express = require('express');
const cors = require('cors');
const connection = require('./database/conexion');
const path = require('path');
//const routes = require('./routes');
const app = express();


const router = express.Router();

const clienteController = require('./controllers/ClienteController');

// Rutas para la entidad Cliente
app.get('/', clienteController.getClientes);

app.get('/:id', clienteController.getClienteById);


//app.use('/api', routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Habilita CORS para evitar problemas de origen cruzado en desarrollo

const PORT = 3000;

// API de prueba
app.get('/api/prueba', (req, res) => {
    res.status(200).json({
        message: 'API funcionando correctamente, SERVIDOR NUEEEEVO',
        port: PORT,
        status: 'success'
    });
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// manejo del cierre de la aplicación

process.on('SIGINT', async () => {
    console.log("Cerrando el servidor...");
    try {
        await connection.end(); // cerrar el Pool de conexiones
        console.log("Conexión a la base de datos cerrada.");
        process.exit(0); // Sale del proceso
    } catch (error) {
        console.error("Error al cerrar la conexión a la base de datos:", error);
        process.exit(1); // Sale del proceso mostrando el error
    }
});