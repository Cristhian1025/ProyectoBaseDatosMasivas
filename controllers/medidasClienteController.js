const { Pool } = require('pg');
const connection = require('../database/conexion');

const getMedidasCliente = async (req, res) => {
  try {
    // Se realiza un JOIN con la tabla Cliente para obtener información adicional del cliente
    const result = await connection.query(`
      SELECT
          mc.id_medidas,
          mc.id_cliente,
          c.nombre AS cliente_nombre,
          c.apellido AS cliente_apellido,
          mc.fecha_medicion,
          mc.peso,
          mc.altura,
          mc.porcentaje_grasa,
          mc.masa_muscular,
          mc.cintura,
          mc.cadera,
          mc.brazo
      FROM
          Medidas_Cliente mc
      INNER JOIN
          Cliente c ON mc.id_cliente = c.id_cliente
      ORDER BY
          mc.fecha_medicion DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las medidas de los clientes' });
  }
};

const getMedidasClienteById = async (req, res) => {
  const id = req.params.id; // Asumiendo que id_medidas es la clave primaria simple
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
  const { id_cliente, fecha_medicion, peso, altura, porcentaje_grasa, masa_muscular, cintura, cadera, brazo } = req.body;

  // Validar que todos los datos obligatorios estén presentes
  if (!id_cliente || !fecha_medicion || !peso || !altura || !porcentaje_grasa || !masa_muscular || !cintura || !cadera || !brazo) {
    return res.status(400).json({ error: 'Faltan datos obligatorios para crear las medidas del cliente' });
  }

  try {
    const result = await connection.query(
      `INSERT INTO Medidas_Cliente (id_cliente, fecha_medicion, peso, altura, porcentaje_grasa, masa_muscular, cintura, cadera, brazo)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [id_cliente, fecha_medicion, peso, altura, porcentaje_grasa, masa_muscular, cintura, cadera, brazo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear las medidas del cliente' });
  }
};

const updateMedidasCliente = async (req, res) => {
  const id = req.params.id; // id_medidas
  const { id_cliente, fecha_medicion, peso, altura, porcentaje_grasa, masa_muscular, cintura, cadera, brazo } = req.body;

  // Verificar si al menos un dato es proporcionado para la actualización
  if (
    id_cliente === undefined &&
    fecha_medicion === undefined &&
    peso === undefined &&
    altura === undefined &&
    porcentaje_grasa === undefined &&
    masa_muscular === undefined &&
    cintura === undefined &&
    cadera === undefined &&
    brazo === undefined
  ) {
    return res.status(400).json({ error: 'Se requiere al menos un dato para actualizar las medidas del cliente' });
  }

  try {
    let query = 'UPDATE Medidas_Cliente SET ';
    const values = [];
    let paramNumber = 1;

    // Construir la consulta dinámicamente
    if (id_cliente !== undefined) {
      query += `id_cliente = $${paramNumber}, `;
      values.push(id_cliente);
      paramNumber++;
    }
    if (fecha_medicion !== undefined) {
      query += `fecha_medicion = $${paramNumber}, `;
      values.push(fecha_medicion);
      paramNumber++;
    }
    if (peso !== undefined) {
      query += `peso = $${paramNumber}, `;
      values.push(peso);
      paramNumber++;
    }
    if (altura !== undefined) {
      query += `altura = $${paramNumber}, `;
      values.push(altura);
      paramNumber++;
    }
    if (porcentaje_grasa !== undefined) { // Corregido el nombre del campo
      query += `porcentaje_grasa = $${paramNumber}, `;
      values.push(porcentaje_grasa);
      paramNumber++;
    }
    if (masa_muscular !== undefined) {
      query += `masa_muscular = $${paramNumber}, `;
      values.push(masa_muscular);
      paramNumber++;
    }
    if (cintura !== undefined) { // Nuevo campo
      query += `cintura = $${paramNumber}, `;
      values.push(cintura);
      paramNumber++;
    }
    if (cadera !== undefined) { // Nuevo campo
      query += `cadera = $${paramNumber}, `;
      values.push(cadera);
      paramNumber++;
    }
    if (brazo !== undefined) { // Nuevo campo
      query += `brazo = $${paramNumber}, `;
      values.push(brazo);
      paramNumber++;
    }

    query = query.slice(0, -2); // Eliminar la última coma y espacio
    query += ` WHERE id_medidas = $${paramNumber} RETURNING *`;
    values.push(id); // Añadir el ID de la medida para la cláusula WHERE

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
