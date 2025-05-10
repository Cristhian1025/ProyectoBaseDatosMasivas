const { Pool } = require('pg');
const connection = require('../database/conexion');

const getPromocionPlan = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Promocion_Plan');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las promociones del plan' });
  }
};

const getPromocionPlanById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Promocion_Plan WHERE id_promocion_plan = $1', [id]);
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
  const id = req.params.id;
  const { id_promocion, id_plan } = req.body;
  if (!id_promocion && !id_plan) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar la promoción del plan' });
  }
  try {
    let query = 'UPDATE Promocion_Plan SET ';
    const values = [];
    let paramNumber = 1;

    if (id_promocion) {
      query += `id_promocion = $${paramNumber}, `;
      values.push(id_promocion);
      paramNumber++;
    }
    if (id_plan) {
      query += `id_plan = $${paramNumber}, `;
      values.push(id_plan);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_promocion_plan = $${paramNumber} RETURNING *`;
    values.push(id);

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
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Promocion_Plan WHERE id_promocion_plan = $1 RETURNING *', [id]);
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
