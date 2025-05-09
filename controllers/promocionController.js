const { Pool } = require('pg');
const connection = require('../database/conexion');

const getPromociones = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Promocion');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las promociones' });
  }
};

const getPromocionById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Promocion WHERE id_promocion = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la promoción' });
  }
};

const createPromocion = async (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, descuento } = req.body;
  if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !descuento) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear la promoción' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Promocion (nombre, descripcion, fecha_inicio, fecha_fin, descuento)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, descripcion, fecha_inicio, fecha_fin, descuento]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la promoción' });
  }
};

const updatePromocion = async (req, res) => {
  const id = req.params.id;
  const { nombre, descripcion, fecha_inicio, fecha_fin, descuento } = req.body;
  if (!nombre && !descripcion && !fecha_inicio && !fecha_fin && !descuento) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar la promoción' });
  }
  try {
    let query = 'UPDATE Promocion SET ';
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
    if (descuento) {
      query += `descuento = $${paramNumber}, `;
      values.push(descuento);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_promocion = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la promoción' });
  }
};

const deletePromocion = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Promocion WHERE id_promocion = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    res.status(200).json({ mensaje: 'Promoción eliminada correctamente', promocion: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la promoción' });
  }
};

module.exports = {
  getPromociones,
  getPromocionById,
  createPromocion,
  updatePromocion,
  deletePromocion
};