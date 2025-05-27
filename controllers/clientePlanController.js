const { Pool } = require('pg');
const connection = require('../database/conexion');

const getClientePlan = async (req, res) => {
    try{
        const result = await connection.query(`
            SELECT
                cp.id_cliente,
                c.nombre AS cliente_nombre,
                c.apellido AS cliente_apellido,
                c.telefono AS cliente_telefono,
                c.fecha_nacimiento AS cliente_fecha_nacimiento,
                c.fecha_inscripcion AS cliente_fecha_inscripcion,
                c.condicion_medica AS cliente_condicion_medica,
                c.id_gimnasio AS cliente_id_gimnasio,
                cp.id_plan,
                p.nombre AS plan_nombre,
                p.descripcion AS plan_descripcion,
                p.precio AS plan_precio,
                cp.fecha_inicio,
                cp.fecha_fin,
                CASE
                    WHEN cp.fecha_fin >= CURRENT_DATE THEN 'Activa'
                    ELSE 'Vencida'
                END AS estado_suscripcion,
                (cp.fecha_fin - CURRENT_DATE) AS dias_restantes -- MODIFICADO: Eliminado EXTRACT(DAYS FROM ...)
            FROM
                Cliente_Plan cp
            INNER JOIN
                Cliente c ON cp.id_cliente = c.id_cliente
            INNER JOIN
                Plan p ON cp.id_plan = p.id_plan
            ORDER BY cp.fecha_inicio DESC
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los planes del clienteee' });
    }
};

// Nuevo: Obtener suscripciones por cliente específico
const getSuscripcionesByCliente = async (req, res) => {
    const { id_cliente } = req.params;
    if (!id_cliente) {
        return res.status(400).json({ error: 'Se requiere id_cliente' });
    }
    try {
        const result = await connection.query(`
            SELECT
                cp.id_cliente,
                cp.id_plan,
                p.nombre AS plan_nombre,
                p.descripcion AS plan_descripcion,
                p.precio AS plan_precio,
                cp.fecha_inicio,
                cp.fecha_fin,
                CASE
                    WHEN cp.fecha_fin >= CURRENT_DATE THEN 'Activa'
                    ELSE 'Vencida'
                END AS estado_suscripcion,
                (cp.fecha_fin - CURRENT_DATE) AS dias_restantes, -- MODIFICADO: Eliminado EXTRACT(DAYS FROM ...)
                c.nombre AS cliente_nombre,
                c.apellido AS cliente_apellido,
                c.telefono AS cliente_telefono
            FROM
                Cliente_Plan cp
            INNER JOIN
                Plan p ON cp.id_plan = p.id_plan
            INNER JOIN
                Cliente c ON cp.id_cliente = c.id_cliente
            WHERE cp.id_cliente = $1
            ORDER BY cp.fecha_inicio DESC
        `, [id_cliente]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las suscripciones del cliente' });
    }
};

// Nuevo: Obtener suscripciones activas
const getSuscripcionesActivas = async (req, res) => {
    try {
        const result = await connection.query(`
            SELECT
                cp.id_cliente,
                c.nombre AS cliente_nombre,
                c.apellido AS cliente_apellido,
                cp.id_plan,
                p.nombre AS plan_nombre,
                p.precio AS plan_precio,
                cp.fecha_inicio,
                cp.fecha_fin,
                (cp.fecha_fin - CURRENT_DATE) AS dias_restantes -- MODIFICADO: Eliminado EXTRACT(DAYS FROM ...)
            FROM
                Cliente_Plan cp
            INNER JOIN
                Cliente c ON cp.id_cliente = c.id_cliente
            INNER JOIN
                Plan p ON cp.id_plan = p.id_plan
            WHERE cp.fecha_fin >= CURRENT_DATE
            ORDER BY cp.fecha_fin ASC
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las suscripciones activas' });
    }
};

// ... (el resto de tus funciones, que no necesitan cambios) ...

const renovarSuscripcion = async (req, res) => {
    const { id_cliente, id_plan } = req.params;
    const { meses = 1 } = req.body;

    if (!id_cliente || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_cliente e id_plan' });
    }

    try {
        // Obtener la suscripción actual
        const currentSub = await connection.query(
            `SELECT * FROM Cliente_Plan WHERE id_cliente = $1 AND id_plan = $2`,
            [id_cliente, id_plan]
        );

        if (currentSub.rows.length === 0) {
            return res.status(404).json({ error: 'Suscripción no encontrada' });
        }

        const fechaActual = currentSub.rows[0].fecha_fin > new Date() ?
            currentSub.rows[0].fecha_fin : new Date();

        const nuevaFechaFin = new Date(fechaActual);
        nuevaFechaFin.setMonth(nuevaFechaFin.getMonth() + parseInt(meses));

        const result = await connection.query(
            `UPDATE Cliente_Plan SET fecha_fin = $1 WHERE id_cliente = $2 AND id_plan = $3 RETURNING *`,
            [nuevaFechaFin, id_cliente, id_plan]
        );

        res.status(200).json({
            mensaje: 'Suscripción renovada correctamente',
            suscripcion: result.rows[0]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al renovar la suscripción' });
    }
};

const getClientePlanById = async (req, res) => {
    const { id_cliente, id_plan } = req.params;
    if (!id_cliente || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_cliente e id_plan para buscar el plan del cliente' });
    }
    try {
        const result = await connection.query(
            `SELECT
                cp.*,
                c.nombre AS cliente_nombre,
                c.apellido AS cliente_apellido,
                c.telefono AS cliente_telefono,
                c.fecha_nacimiento AS cliente_fecha_nacimiento,
                c.fecha_inscripcion AS cliente_fecha_inscripcion,
                c.condicion_medica AS cliente_condicion_medica,
                c.id_gimnasio AS cliente_id_gimnasio,
                p.nombre AS plan_nombre,
                p.descripcion AS plan_descripcion,
                p.precio AS plan_precio,
                CASE
                    WHEN cp.fecha_fin >= CURRENT_DATE THEN 'Activa'
                    ELSE 'Vencida'
                END AS estado_suscripcion
            FROM Cliente_Plan cp
            INNER JOIN Cliente c ON cp.id_cliente = c.id_cliente
            INNER JOIN Plan p ON cp.id_plan = p.id_plan
            WHERE cp.id_cliente = $1 AND cp.id_plan = $2`,
            [id_cliente, id_plan]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Plan del cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el plan del cliente' });
    }
};

const createClientePlan = async (req, res) => {
    const { id_cliente, id_plan, fecha_inicio, fecha_fin, meses } = req.body;

    if (!id_cliente || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_cliente e id_plan' });
    }

    let fechaInicioFinal = fecha_inicio || new Date();
    let fechaFinFinal = fecha_fin;

    // Si no se proporciona fecha_fin pero sí meses, calcularla
    if (!fecha_fin && meses) {
        fechaFinFinal = new Date(fechaInicioFinal);
        fechaFinFinal.setMonth(fechaFinFinal.getMonth() + parseInt(meses));
    } else if (!fecha_fin) {
        // Por defecto, 1 mes
        fechaFinFinal = new Date(fechaInicioFinal);
        fechaFinFinal.setMonth(fechaFinFinal.getMonth() + 1);
    }

    try {
        // Verificar si ya existe una suscripción activa
        const existingSub = await connection.query(
            `SELECT * FROM Cliente_Plan WHERE id_cliente = $1 AND id_plan = $2 AND fecha_fin >= CURRENT_DATE`,
            [id_cliente, id_plan]
        );

        if (existingSub.rows.length > 0) {
            return res.status(400).json({ error: 'El cliente ya tiene una suscripción activa para este plan' });
        }

        const result = await connection.query(
            `INSERT INTO Cliente_Plan (id_cliente, id_plan, fecha_inicio, fecha_fin)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [id_cliente, id_plan, fechaInicioFinal, fechaFinFinal]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el plan del cliente' });
    }
};

const updateClientePlan = async (req, res) => {
    const { id_cliente, id_plan } = req.params;
    const { nueva_id_cliente, nueva_id_plan, fecha_inicio, fecha_fin } = req.body;
    const values = [];
    let queryParts = [];
    let paramNumber = 1;

    if (!id_cliente || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_cliente e id_plan para identificar el plan a actualizar' });
    }

    if (nueva_id_cliente) {
        queryParts.push(`id_cliente = $${paramNumber}`);
        values.push(nueva_id_cliente);
        paramNumber++;
    }
    if (nueva_id_plan) {
        queryParts.push(`id_plan = $${paramNumber}`);
        values.push(nueva_id_plan);
        paramNumber++;
    }
    if (fecha_inicio) {
        queryParts.push(`fecha_inicio = $${paramNumber}`);
        values.push(fecha_inicio);
        paramNumber++;
    }
    if (fecha_fin) {
        queryParts.push(`fecha_fin = $${paramNumber}`);
        values.push(fecha_fin);
        paramNumber++;
    }

    if (queryParts.length === 0) {
        return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el plan del cliente' });
    }

    let query = `UPDATE Cliente_Plan SET ${queryParts.join(', ')} WHERE id_cliente = $${paramNumber} AND id_plan = $${paramNumber + 1} RETURNING *`;
    values.push(id_cliente, id_plan);

    try {
        const result = await connection.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Plan del cliente no encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el plan del cliente' });
    }
};

const deleteClientePlan = async (req, res) => {
    const { id_cliente, id_plan } = req.params;
    if (!id_cliente || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_cliente e id_plan para eliminar el plan del cliente' });
    }
    try {
        const result = await connection.query(
            `DELETE FROM Cliente_Plan WHERE id_cliente = $1 AND id_plan = $2 RETURNING *`,
            [id_cliente, id_plan]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Plan del cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Plan del cliente eliminado correctamente', clientePlan: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el plan del cliente' });
    }
};

module.exports = {
    getClientePlan,
    getClientePlanById,
    getSuscripcionesByCliente,
    getSuscripcionesActivas,
    createClientePlan,
    updateClientePlan,
    deleteClientePlan,
    renovarSuscripcion
};