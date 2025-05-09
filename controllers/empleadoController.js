const { Pool } = require('pg');
const connection = require('../database/conexion');

const getEmpleados = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Empleado');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los empleados' });
  }
};

const getEmpleadoById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Empleado WHERE id_empleado = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el empleado' });
  }
};

const createEmpleado = async (req, res) => {
  const { nombre, apellido, cargo, email, telefono, id_gimnasio } = req.body;
  if (!nombre || !apellido || !cargo || !email || !telefono || !id_gimnasio) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el empleado' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Empleado (nombre, apellido, cargo, email, telefono, id_gimnasio)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, apellido, cargo, email, telefono, id_gimnasio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

const updateEmpleado = async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, cargo, email, telefono, id_gimnasio } = req.body;
  if (!nombre && !apellido && !cargo && !email && !telefono && !id_gimnasio) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el empleado' });
  }
  try {
    let query = 'UPDATE Empleado SET ';
    const values = [];
    let paramNumber = 1;

    if (nombre) {
      query += `nombre = $${paramNumber}, `;
      values.push(nombre);
      paramNumber++;
    }
    if (apellido) {
      query += `apellido = $${paramNumber}, `;
      values.push(apellido);
      paramNumber++;
    }
    if (cargo) {
      query += `cargo = $${paramNumber}, `;
      values.push(cargo);
      paramNumber++;
    }
    if (email) {
      query += `email = $${paramNumber}, `;
      values.push(email);
      paramNumber++;
    }
    if (telefono) {
      query += `telefono = $${paramNumber}, `;
      values.push(telefono);
      paramNumber++;
    }
    if (id_gimnasio) {
      query += `id_gimnasio = $${paramNumber}, `;
      values.push(id_gimnasio);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_empleado = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el empleado' });
  }
};

const deleteEmpleado = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Empleado WHERE id_empleado = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }
    res.status(200).json({ mensaje: 'Empleado eliminado correctamente', empleado: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el empleado' });
  }
};

module.exports = {
  getEmpleados,
  getEmpleadoById,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado
};
