const { Pool } = require('pg');
const connection = require('../database/conexion');

const getPlanes = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Plan');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los planes' });
  }
};

const getPlanById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Plan WHERE id_plan = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el plan' });
  }
};

const createPlan = async (req, res) => {
  const { nombre, descripcion, precio, duracion_semanas } = req.body;
  if (!nombre || !descripcion || !precio || !duracion_semanas) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el plan' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Plan (nombre, descripcion, precio, duracion_semanas)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, descripcion, precio, duracion_semanas]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el plan' });
  }
};

const updatePlan = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, precio, duracion_semanas } = req.body;
  if (!nombre && !descripcion && !precio && !duracion_semanas) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el plan' });
  }
  try {
    let query = 'UPDATE Plan SET ';
    const values = [];
    let paramNumber = 1;

    if (nombre) {
      query += `nombre = $${paramNumber}, `;
      values.push(nombre);
      paramNumber++;
    }
    if (descripcion) {
      query += `descripcion = $${paramNumber}, `;
      values.push(descripcion);
      paramNumber++;
    }
    if (precio) {
      query += `precio = $${paramNumber}, `;
      values.push(precio);
      paramNumber++;
    }
    if (duracion_semanas) {
      query += `duracion_semanas = $${paramNumber}, `;
      values.push(duracion_semanas);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_plan = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el plan' });
  }
};

const deletePlan = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Plan WHERE id_plan = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.status(200).json({ mensaje: 'Plan eliminado correctamente', plan: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el plan' });
  }
};

module.exports = {
  getPlanes,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};