const { Pool } = require('pg');
const connection = require('../database/conexion');

const getClientePlan = async (req, res) => {
    try {
        const result = await connection.query(`
            SELECT
                cp.id_cliente,
                c.nombre AS cliente_nombre,
                c.apellido AS cliente_apellido,
                cp.id_plan,
                p.nombre AS plan_nombre,
                p.descripcion AS plan_descripcion,
                cp.fecha_inicio,
                cp.fecha_fin
            FROM
                Cliente_Plan cp
            INNER JOIN
                Cliente c ON cp.id_cliente = c.id_cliente
            INNER JOIN
                Plan p ON cp.id_plan = p.id_plan
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los planes del cliente' });
    }
};

const getClientePlanById = async (req, res) => {
    const { id_cliente, id_plan } = req.params;
    if (!id_cliente || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_cliente e id_plan para buscar el plan del cliente' });
    }
    try {
        const result = await connection.query(
            `SELECT * FROM Cliente_Plan WHERE id_cliente = $1 AND id_plan = $2`,
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
    const { id_cliente, id_plan, fecha_inicio, fecha_fin } = req.body;
    if (!id_cliente || !id_plan || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear el plan del cliente' });
    }
    try {
        const result = await connection.query(
            `INSERT INTO Cliente_Plan (id_cliente, id_plan, fecha_inicio, fecha_fin)
            VALUES ($1, $2, $3, $4) RETURNING *`,
            [id_cliente, id_plan, fecha_inicio, fecha_fin]
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
    createClientePlan,
    updateClientePlan,
    deleteClientePlan
};