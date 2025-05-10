const { Pool } = require('pg');
const connection = require('../database/conexion');

const getClientePlan = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Cliente_Plan');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los planes del cliente' });
  }
};

const getClientePlanById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Cliente_Plan WHERE id_cliente_plan = $1', [id]);
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
  const id = req.params.id;
  const { id_cliente, id_plan, fecha_inicio, fecha_fin } = req.body;
  if (!id_cliente && !id_plan && !fecha_inicio && !fecha_fin) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el plan del cliente' });
  }
  try {
    let query = 'UPDATE Cliente_Plan SET ';
    const values = [];
    let paramNumber = 1;

    if (id_cliente) {
      query += `id_cliente = $${paramNumber}, `;
      values.push(id_cliente);
      paramNumber++;
    }
    if (id_plan) {
      query += `id_plan = $${paramNumber}, `;
      values.push(id_plan);
      paramNumber++;
    }
    if (fecha_inicio) {
      query += `fecha_inicio = $${paramNumber}, `;
      values.push(fecha_inicio);
      paramNumber++;
    }
    if (fecha_fin) {
      query += `fecha_fin = $${paramNumber}, `;
      values.push(fecha_fin);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_cliente_plan = $${paramNumber} RETURNING *`;
    values.push(id);

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
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Cliente_Plan WHERE id_cliente_plan = $1 RETURNING *', [id]);
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
