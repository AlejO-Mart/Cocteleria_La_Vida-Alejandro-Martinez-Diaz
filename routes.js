const express = require('express');
const router = express.Router();
const { Comentarios } = require('./config/db');

// Ruta para manejar la creación de comentarios
router.post('/comentarios', async (req, res) => {
  const { nombre, apellido, correo, telefono, tipo, calificacion, entidad_id, comentario } = req.body;

  try {
    const nuevoComentario = await Comentarios.create({
      nombre,
      apellido,
      correo,
      telefono,
      tipo,
      calificacion,
      entidad_id,
      comentario
    });
    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error('Error al crear el comentario:', error); // Log detallado del error
    res.status(500).json({ error: error.message || 'Error al crear el comentario' });
  }
});

module.exports = router;
