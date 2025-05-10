const { Pool } = require('pg');
const connection = require('../database/conexion');

const getMedidasCliente = async (req, res) => {
  try {
    const result = await connection.query('SELECT * FROM Medidas_Cliente');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las medidas de los clientesssd' });
  }
};

const getMedidasClienteById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('SELECT * FROM Medidas_Cliente WHERE id_medidas = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medidas del cliente no encontradas' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las medidas del cliente' });
  }
};

const createMedidasCliente = async (req, res) => {
  const { id_cliente, fecha_medicion, peso, altura, grasa_corporal, masa_muscular } = req.body;
  if (!id_cliente || !fecha_medicion || !peso || !altura || !grasa_corporal || !masa_muscular) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear las medidas del cliente' });
  }
  try {
    const result = await connection.query(
      `INSERT INTO Medidas_Cliente (id_cliente, fecha_medicion, peso, altura, grasa_corporal, masa_muscular)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_cliente, fecha_medicion, peso, altura, grasa_corporal, masa_muscular]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear las medidas del cliente' });
  }
};

const updateMedidasCliente = async (req, res) => {
  const id = req.params.id;
  const { id_cliente, fecha_medicion, peso, altura, grasa_corporal, masa_muscular } = req.body;
  if (!id_cliente && !fecha_medicion && !peso && !altura && !grasa_corporal && !masa_muscular) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar las medidas del cliente' });
  }
  try {
    let query = 'UPDATE Medidas_Cliente SET ';
    const values = [];
    let paramNumber = 1;

    if (id_cliente) {
      query += `id_cliente = $${paramNumber}, `;
      values.push(id_cliente);
      paramNumber++;
    }
    if (fecha_medicion) {
      query += `fecha_medicion = $${paramNumber}, `;
      values.push(fecha_medicion);
      paramNumber++;
    }
    if (peso) {
      query += `peso = $${paramNumber}, `;
      values.push(peso);
      paramNumber++;
    }
    if (altura) {
      query += `altura = $${paramNumber}, `;
      values.push(altura);
      paramNumber++;
    }
    if (grasa_corporal) {
      query += `grasa_corporal = $${paramNumber}, `;
      values.push(grasa_corporal);
      paramNumber++;
    }
    if (masa_muscular) {
      query += `masa_muscular = $${paramNumber}, `;
      values.push(masa_muscular);
      paramNumber++;
    }

    query = query.slice(0, -2);
    query += ` WHERE id_medidas = $${paramNumber} RETURNING *`;
    values.push(id);

    const result = await connection.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medidas del cliente no encontradas' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar las medidas del cliente' });
  }
};

const deleteMedidasCliente = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await connection.query('DELETE FROM Medidas_Cliente WHERE id_medidas = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Medidas del cliente no encontradas' });
    }
    res.status(200).json({ mensaje: 'Medidas del cliente eliminadas correctamente', medidas: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar las medidas del cliente' });
  }
};

module.exports = {
  getMedidasCliente,
  getMedidasClienteById,
  createMedidasCliente,
  updateMedidasCliente,
  deleteMedidasCliente
};