const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

const app = express();

// Middleware para manejar las cookies
app.use(cookieParser());

// Configurar sesiones
app.use(session({
  secret: 'mySecretKey',  // Clave secreta para firmar las sesiones
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Cambiar a `true` si usas HTTPS
}));

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error de conexión:', err));

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);  // Ruta para la autenticación
app.use('/api', messageRoutes);  // Ruta para los mensajes

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});
