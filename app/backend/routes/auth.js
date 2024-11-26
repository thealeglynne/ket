const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Asegúrate de tener un modelo de usuario en MongoDB
const router = express.Router();

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ username });
    
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Si todo es correcto, almacenamos la información del usuario en la sesión
    req.session.user = user;
    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: err });
  }
});

// Ruta para verificar si el usuario está autenticado
router.get('/me', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'No autenticado' });
  }
});

// Ruta de cierre de sesión
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    res.status(200).json({ message: 'Cerrado sesión exitosamente' });
  });
});

module.exports = router;
