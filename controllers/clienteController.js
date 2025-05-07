const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL; // Asegúrate de configurar la variable de entorno DATABASE_URL
const pool = new Pool({ connectionString });

/**
 * Obtiene todos los clientes de la base de datos.
 * @param {Request} req - El objeto de la solicitud de Express.
 * @param {Response} res - El objeto de la respuesta de Express.
 */
const getClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Cliente');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

/**
 * Obtiene un cliente por su ID.
 * @param {Request} req - El objeto de la solicitud de Express.
 * @param {Response} res - El objeto de la respuesta de Express.
 */
const getClienteById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM Cliente WHERE id_cliente = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

/**
 * Crea un nuevo cliente en la base de datos.
 * @param {Request} req - El objeto de la solicitud de Express.
 * @param {Response} res - El objeto de la respuesta de Express.
 */
const createCliente = async (req, res) => {
    const { id_usuario, nombre, apellido, fecha_nacimiento, telefono, fecha_inscripcion, condicion_medica, id_gimnasio } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!id_usuario || !nombre || !apellido || !fecha_inscripcion || !id_gimnasio) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear el cliente' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO Cliente (id_usuario, nombre, apellido, fecha_nacimiento, telefono, fecha_inscripcion, condicion_medica, id_gimnasio) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [id_usuario, nombre, apellido, fecha_nacimiento, telefono, fecha_inscripcion, condicion_medica, id_gimnasio]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

/**
 * Actualiza un cliente existente en la base de datos.
 * @param {Request} req - El objeto de la solicitud de Express.
 * @param {Response} res - El objeto de la respuesta de Express.
 */
const updateCliente = async (req, res) => {
    const id = req.params.id;
    const { id_usuario, nombre, apellido, fecha_nacimiento, telefono, fecha_inscripcion, condicion_medica, id_gimnasio } = req.body;

    // Validar que al menos un dato para actualizar esté presente
    if (!id_usuario && !nombre && !apellido && !fecha_nacimiento && !telefono && !fecha_inscripcion && !condicion_medica && !id_gimnasio) {
        return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el cliente' });
    }

    try {
        // Construir la consulta dinámicamente para actualizar solo los campos proporcionados
        let query = 'UPDATE Cliente SET ';
        const values = [];
        let paramNumber = 1;

        if (id_usuario) {
            query += `id_usuario = $${paramNumber}, `;
            values.push(id_usuario);
            paramNumber++;
        }
        if (nombre) {
            query += `nombre = $${paramNumber}, `;
            values.push(nombre);
            paramNumber++;
        }
        if (apellido) {
            query += `apellido = $${paramNumber}, `;
            values.push(apellido);
            paramNumber++;
        }
        if (fecha_nacimiento) {
            query += `fecha_nacimiento = $${paramNumber}, `;
            values.push(fecha_nacimiento);
            paramNumber++;
        }
        if (telefono) {
            query += `telefono = $${paramNumber}, `;
            values.push(telefono);
            paramNumber++;
        }
        if (fecha_inscripcion) {
            query += `fecha_inscripcion = $${paramNumber}, `;
            values.push(fecha_inscripcion);
            paramNumber++;
        }
        if (condicion_medica) {
            query += `condicion_medica = $${paramNumber}, `;
            values.push(condicion_medica);
            paramNumber++;
        }
        if (id_gimnasio) {
            query += `id_gimnasio = $${paramNumber}, `;
            values.push(id_gimnasio);
            paramNumber++;
        }

        // Eliminar la coma y el espacio final de la consulta
        query = query.slice(0, -2);
        query += ` WHERE id_cliente = $${paramNumber} RETURNING *`;
        values.push(id);

        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

/**
 * Elimina un cliente por su ID.
 * @param {Request} req - El objeto de la solicitud de Express.
 * @param {Response} res - El objeto de la respuesta de Express.
 */
const deleteCliente = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('DELETE FROM Cliente WHERE id_cliente = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado correctamente', cliente: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    getClientes,
    getClienteById,
    createCliente,
    updateCliente,
    deleteCliente
};
