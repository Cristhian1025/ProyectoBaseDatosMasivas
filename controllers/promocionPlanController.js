const { Pool } = require('pg');
const connection = require('../database/conexion');

const getPromocionPlan = async (req, res) => {
    try {
        const result = await connection.query(`
            SELECT
                pp.id_promocion,
                p.nombre AS promocion_nombre,
                p.descripcion AS promocion_descripcion,
                pp.id_plan,
                pl.nombre AS plan_nombre,
                pl.descripcion AS plan_descripcion,
                p.descuento_porcentaje
            FROM
                Promocion_Plan pp
            INNER JOIN
                Promocion p ON pp.id_promocion = p.id_promocion
            INNER JOIN
                Plan pl ON pp.id_plan = pl.id_plan
        `);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las promociones del plan' });
    }
};

const getPromocionPlanById = async (req, res) => {
    const { id_promocion, id_plan } = req.params;
     if (!id_promocion || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_promocion e id_plan para buscar la promoción del plan' });
    }
    try {
        const result = await connection.query(
            'SELECT * FROM Promocion_Plan WHERE id_promocion = $1 AND id_plan = $2',
            [id_promocion, id_plan]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promoción del plan no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la promoción del plan' });
    }
};

const createPromocionPlan = async (req, res) => {
    const { id_promocion, id_plan } = req.body;
    if (!id_promocion || !id_plan) {
        return res.status(400).json({ error: 'Faltan datos obligatorios para crear la promoción del plan' });
    }
    try {
        const result = await connection.query(
            `INSERT INTO Promocion_Plan (id_promocion, id_plan)
            VALUES ($1, $2) RETURNING *`,
            [id_promocion, id_plan]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la promoción del plan' });
    }
};

const updatePromocionPlan = async (req, res) => {
    const { id_promocion, id_plan } = req.params;
    const { nueva_id_promocion, nueva_id_plan } = req.body;
    if (!nueva_id_promocion && !nueva_id_plan) {
        return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar la promoción del plan' });
    }
    try {
        let query = 'UPDATE Promocion_Plan SET ';
        const values = [];
        let paramNumber = 1;

        if (nueva_id_promocion) {
            query += `id_promocion = $${paramNumber}, `;
            values.push(nueva_id_promocion);
            paramNumber++;
        }
        if (nueva_id_plan) {
            query += `id_plan = $${paramNumber}, `;
            values.push(nueva_id_plan);
            paramNumber++;
        }

        query = query.slice(0, -2);
        query += ` WHERE id_promocion = $${paramNumber} AND id_plan = $${paramNumber + 1} RETURNING *`;
        values.push(id_promocion, id_plan);

        const result = await connection.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promoción del plan no encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la promoción del plan' });
    }
};

const deletePromocionPlan = async (req, res) => {
     const { id_promocion, id_plan } = req.params;
      if (!id_promocion || !id_plan) {
        return res.status(400).json({ error: 'Se requieren id_promocion e id_plan para eliminar la promoción del plan' });
    }
    try {
        const result = await connection.query(
            'DELETE FROM Promocion_Plan WHERE id_promocion = $1 AND id_plan = $2 RETURNING *',
            [id_promocion, id_plan]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Promoción del plan no encontrada' });
        }
        res.status(200).json({ mensaje: 'Promoción del plan eliminada correctamente', promocionPlan: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la promoción del plan' });
    }
};

module.exports = {
    getPromocionPlan,
    getPromocionPlanById,
    createPromocionPlan,
    updatePromocionPlan,
    deletePromocionPlan
};
