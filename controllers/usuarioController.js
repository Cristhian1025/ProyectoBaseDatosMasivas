const { Pool } = require('pg');
const connection = require('../database/conexion');

const getUsuarios = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Usuario');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

const getUsuarioById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Usuario WHERE id_usuario = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const createUsuario = async (req, res) => {
  const {id_usuario, email, contrasena, rol, activo } = req.body;
  if (!id_usuario || !email || !contrasena || !rol || !activo) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear el usuario' });
  }
  try {

    const result = await connection.query(
      `INSERT INTO Usuario (id_usuario, email, contrasena, rol, activo) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_usuario, email, contrasena, rol, activo]  
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const updateUsuario = async (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, email, contraseña, fecha_nacimiento, telefono, tipo_usuario } = req.body;
  if (!nombre && !apellido && !email && !contraseña && !fecha_nacimiento && !telefono && !tipo_usuario) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar el usuario' });
  }
  try {
    let query = 'UPDATE Usuario SET ';
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
    if (email) {
      query += `email = $${paramNumber}, `;
      values.push(email);
      paramNumber++;
    }
    if (contraseña) {
      query += `contraseña = $${paramNumber}, `;
      values.push(contraseña);
      paramNumber++;
    }
    if (fecha_nacimiento) {
      query += `fecha_nacimiento = $${paramNumber}, `;
      values.push(fecha_nacimiento);
      paramNumber++;
    }
    if (telefono) {
      query += `telefono = $${paramNumber}, `;
      values.push(telefono);
      paramNumber++;
    }
    if (tipo_usuario) {
      query += `tipo_usuario = $${paramNumber}, `;
      values.push(tipo_usuario);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_usuario = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const deleteUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Usuario WHERE id_usuario = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente', usuario: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};