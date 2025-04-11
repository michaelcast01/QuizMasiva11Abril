const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/api/ping', (req, res) => {
  res.send('🚀 API activa y funcionando');
});


// Obtener todas las personas
app.get('/api/personas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM persona');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al obtener personas', details: err.message });
  }
});

// Crear una persona
app.post('/api/personas', async (req, res) => {
  const { nombre, apellido1, apellido2, dni } = req.body;
  try {
    await pool.query(
      'INSERT INTO persona (nombre, apellido1, apellido2, dni) VALUES ($1, $2, $3, $4)',
      [nombre, apellido1, apellido2, dni]
    );
    res.status(201).json({ message: '✅ Persona creada' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al crear persona', details: err.message });
  }
});

// Actualizar persona
app.put('/api/personas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido1, apellido2, dni } = req.body;
  try {
    await pool.query(
      'UPDATE persona SET nombre=$1, apellido1=$2, apellido2=$3, dni=$4 WHERE id=$5',
      [nombre, apellido1, apellido2, dni, id]
    );
    res.status(200).json({ message: '✏️ Persona actualizada' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al actualizar persona', details: err.message });
  }
});

// Eliminar persona
app.delete('/api/personas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM persona WHERE id = $1', [id]);
    res.status(200).json({ message: '🗑️ Persona eliminada' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al eliminar persona', details: err.message });
  }
});


// Obtener todos los coches
app.get('/api/coches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM coche');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al obtener coches', details: err.message });
  }
});

// Obtener coches de una persona
app.get('/api/personas/:id/coches', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM coche WHERE persona_id = $1', [id]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: '❌ Error al obtener coches de la persona', details: err.message });
  }
});

// Crear un coche
app.post('/api/coches', async (req, res) => {
  const { matricula, marca, modelo, caballos, persona_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO coche (matricula, marca, modelo, caballos, persona_id) VALUES ($1, $2, $3, $4, $5)',
      [matricula, marca, modelo, caballos, persona_id]
    );
    res.status(201).json({ message: '✅ Coche creado' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al crear coche', details: err.message });
  }
});

// Actualizar coche
app.put('/api/coches/:matricula', async (req, res) => {
  const { matricula } = req.params;
  const { marca, modelo, caballos, persona_id } = req.body;
  try {
    await pool.query(
      'UPDATE coche SET marca=$1, modelo=$2, caballos=$3, persona_id=$4 WHERE matricula=$5',
      [marca, modelo, caballos, persona_id, matricula]
    );
    res.status(200).json({ message: '✏️ Coche actualizado' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al actualizar coche', details: err.message });
  }
});

// Eliminar coche
app.delete('/api/coches/:matricula', async (req, res) => {
  const { matricula } = req.params;
  try {
    await pool.query('DELETE FROM coche WHERE matricula = $1', [matricula]);
    res.status(200).json({ message: '🗑️ Coche eliminado' });
  } catch (err) {
    res.status(500).json({ error: '❌ Error al eliminar coche', details: err.message });
  }
});


// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
