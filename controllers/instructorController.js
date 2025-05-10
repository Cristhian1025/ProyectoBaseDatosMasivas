const { Pool } = require('pg');
const connection = require('../database/conexion');

const getInstructores = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Instructor');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los instructores' });
  }
};

const getInstructorById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Instructor WHERE id_instructor = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instructor no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el instructor' });
  }
};

const createInstructor = async (req, res) => {
  const { id_empleado, especialidad, coach } = req.body;
  if (!id_empleado || !especialidad || !coach) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el instructor' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Instructor (id_empleado, especialidad, coach)
       VALUES ($1, $2, $3) RETURNING *`,
      [id_empleado, especialidad, coach]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el instructor' });
  }
};

const updateInstructor = async (req, res) => {
  const id = req.params.id;
  const { id_empleado, especialidad, coach } = req.body;
  if (!id_empleado && !especialidad && !coach) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el instructor' });
  }
  try {
    let query = 'UPDATE Instructor SET ';
    const values = [];
    let paramNumber = 1;

    if (id_empleado) {
      query += `id_empleado = $${paramNumber}, `;
      values.push(id_empleado);
      paramNumber++;
    }
    if (especialidad) {
      query += `especialidad = $${paramNumber}, `;
      values.push(especialidad);
      paramNumber++;
    }
    if (coach) {
      query += `coach = $${paramNumber}, `;
      values.push(coach);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_instructor = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instructor no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el instructor' });
  }
};

const deleteInstructor = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Instructor WHERE id_instructor = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Instructor no encontrado' });
    }
    res.status(200).json({ mensaje: 'Instructor eliminado correctamente', instructor: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el instructor' });
  }
};

module.exports = {
  getInstructores,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor
};
