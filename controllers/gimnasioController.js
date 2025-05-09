const { Pool } = require('pg');
const connection = require('../database/conexion');

const getGimnasios = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Gimnasio');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los gimnasios' });
  }
};

const getGimnasioById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Gimnasio WHERE id_gimnasio = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gimnasio no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el gimnasio' });
  }
};

const createGimnasio = async (req, res) => {
  const {nombre, ubicacion, direccion, telefono, horario_apertura, horario_cierre} = req.body;
  if (!nombre || !ubicacion || !direccion || !horario_apertura || !horario_cierre) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el gimnasio' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Gimnasio (nombre, ubicacion, direccion, telefono, horario_apertura, horario_cierre) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, ubicacion, direccion, telefono, horario_apertura, horario_cierre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el gimnasio' });
  }
};

const updateGimnasio = async (req, res) => {
  const id = req.params.id;
  const { nombre, ubicacion, direccion, telefono, horario_apertura, horario_cierre } = req.body;
  if (!nombre && !ubicacion && !direccion && !telefono && !horario_apertura && !horario_cierre) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el gimnasio' });
  }
  try {
    let query = 'UPDATE Gimnasio SET ';
    const values = [];
    let paramNumber = 1;
    if (nombre) {
      query += `nombre = $${paramNumber}, `;
      values.push(nombre);
      paramNumber++;
    }
    if (ubicacion) {
      query += `ubicacion = $${paramNumber}, `;
      values.push(ubicacion);
      paramNumber++;
    }
    if (direccion) {
      query += `direccion = $${paramNumber}, `;
      values.push(direccion);
      paramNumber++;
    }
    if (telefono) {
      query += `telefono = $${paramNumber}, `;
      values.push(telefono);
      paramNumber++;
    }
    if (horario_apertura) {
      query += `horario_apertura = $${paramNumber}, `;
      values.push(horario_apertura);
      paramNumber++;
    }
    if (horario_cierre) {
      query += `horario_cierre = $${paramNumber}, `;
      values.push(horario_cierre);
      paramNumber++;
    }
    query = query.slice(0, -2);
    query += ` WHERE id_gimnasio = $${paramNumber} RETURNING *`;
    values.push(id);
    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gimnasio no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el gimnasio' });
  }
};

const deleteGimnasio = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Gimnasio WHERE id_gimnasio = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Gimnasio no encontrado' });
    }
    res.status(200).json({ mensaje: 'Gimnasio eliminado correctamente', gimnasio: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el gimnasio' });
  }
};

module.exports = {
  getGimnasios,
  getGimnasioById,
  createGimnasio,
  updateGimnasio,
  deleteGimnasio
};
