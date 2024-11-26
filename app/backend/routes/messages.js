const express = require('express');
const Message = require('../models/Message');  // Usamos el modelo de Sequelize para Message
const router = express.Router();

// Ruta para obtener todos los mensajes
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los mensajes', error: err });
  }
});

// Ruta para enviar un nuevo mensaje
router.post('/messages', async (req, res) => {
  const { user, message, isModerator } = req.body;

  try {
    const newMessage = await Message.create({
      user,
      message,
      isModerator
    });

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error al enviar el mensaje', error: err });
  }
});

module.exports = router;
