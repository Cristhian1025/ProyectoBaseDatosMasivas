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
  // Destructure fields as per the database schema and frontend payload
  const { id_usuario, nombre, apellido, telefono, fecha_contratacion, puesto, id_gimnasio } = req.body;

  // Validate mandatory fields
  if (!nombre || !apellido || !telefono || !fecha_contratacion || !puesto || !id_gimnasio) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el empleado' });
  }

  try {
    const result = await connection.query(
      `INSERT INTO Empleado (id_usuario, nombre, apellido, telefono, fecha_contratacion, puesto, id_gimnasio)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [id_usuario, nombre, apellido, telefono, fecha_contratacion, puesto, id_gimnasio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el empleado' });
  }
};

const updateEmpleado = async (req, res) => {
  const id = req.params.id;
  // Destructure fields as per the database schema and frontend payload
  // id_usuario can be null, so check for undefined explicitly
  const { id_usuario, nombre, apellido, telefono, fecha_contratacion, puesto, id_gimnasio } = req.body;

  // Check if at least one field is provided for update
  // Use 'undefined' check for id_usuario as it can be null
  if (
    nombre === undefined &&
    apellido === undefined &&
    telefono === undefined &&
    fecha_contratacion === undefined &&
    puesto === undefined &&
    id_gimnasio === undefined &&
    id_usuario === undefined // Check for id_usuario explicitly
  ) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el empleado' });
  }

  try {
    let query = 'UPDATE Empleado SET ';
    const values = [];
    let paramNumber = 1;

    // Conditionally add fields to the query if they are provided in the request body
    if (nombre !== undefined) {
      query += `nombre = $${paramNumber}, `;
      values.push(nombre);
      paramNumber++;
    }
    if (apellido !== undefined) {
      query += `apellido = $${paramNumber}, `;
      values.push(apellido);
      paramNumber++;
    }
    if (telefono !== undefined) {
      query += `telefono = $${paramNumber}, `;
      values.push(telefono);
      paramNumber++;
    }
    if (fecha_contratacion !== undefined) {
      query += `fecha_contratacion = $${paramNumber}, `;
      values.push(fecha_contratacion);
      paramNumber++;
    }
    if (puesto !== undefined) { // Corrected from 'cargo' to 'puesto'
      query += `puesto = $${paramNumber}, `;
      values.push(puesto);
      paramNumber++;
    }
    if (id_gimnasio !== undefined) {
      query += `id_gimnasio = $${paramNumber}, `;
      values.push(id_gimnasio);
      paramNumber++;
    }
    if (id_usuario !== undefined) { // Allow updating id_usuario, including setting it to null
      query += `id_usuario = $${paramNumber}, `;
      values.push(id_usuario);
      paramNumber++;
    }

    query = query.slice(0, -2); // Remove the trailing ', '
    query += ` WHERE id_empleado = $${paramNumber} RETURNING *`;
    values.push(id); // Add the ID for the WHERE clause

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
