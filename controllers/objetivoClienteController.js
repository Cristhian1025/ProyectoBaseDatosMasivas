const { Pool } = require('pg');
const connection = require('../database/conexion');

const getObjetivoCliente = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Objetivo_Cliente');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los objetivos del cliente' });
  }
};

const getObjetivoClienteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Objetivo_Cliente WHERE id_objetivo = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo del cliente no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el objetivo del cliente' });
  }
};

const createObjetivoCliente = async (req, res) => {
  const { id_cliente, objetivo, fecha_inicio, fecha_fin } = req.body;
  if (!id_cliente || !objetivo || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el objetivo del cliente' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Objetivo_Cliente (id_cliente, objetivo, fecha_inicio, fecha_fin)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_cliente, objetivo, fecha_inicio, fecha_fin]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el objetivo del cliente' });
  }
};

const updateObjetivoCliente = async (req, res) => {
  const id = req.params.id;
  const { id_cliente, objetivo, fecha_inicio, fecha_fin } = req.body;
  if (!id_cliente && !objetivo && !fecha_inicio && !fecha_fin) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el objetivo del cliente' });
  }
  try {
    let query = 'UPDATE Objetivo_Cliente SET ';
    const values = [];
    let paramNumber = 1;

    if (id_cliente) {
      query += `id_cliente = $${paramNumber}, `;
      values.push(id_cliente);
      paramNumber++;
    }
    if (objetivo) {
      query += `objetivo = $${paramNumber}, `;
      values.push(objetivo);
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
    query += ` WHERE id_objetivo = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo del cliente no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el objetivo del cliente' });
  }
};

const deleteObjetivoCliente = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Objetivo_Cliente WHERE id_objetivo = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Objetivo del cliente no encontrado' });
    }
    res.status(200).json({ mensaje: 'Objetivo del cliente eliminado correctamente', objetivo: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el objetivo del cliente' });
  }
};

module.exports = {
  getObjetivoCliente,
  getObjetivoClienteById,
  createObjetivoCliente,
  updateObjetivoCliente,
  deleteObjetivoCliente
};