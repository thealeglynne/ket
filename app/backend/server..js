const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const { Sequelize } = require('sequelize');

// Crear la conexión a la base de datos MySQL
const sequelize = new Sequelize('chat_db', 'root', 'tu_contraseña', {
  host: 'localhost',  // Cambia el host si estás utilizando un servidor remoto
  dialect: 'mysql',
  logging: false, // Puedes activar esto para ver las consultas SQL en la consola
});

const app = express();

// Middleware para manejar las cookies
app.use(cookieParser());

// Configurar sesiones
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Cambia a `true` si usas HTTPS
}));

// Probar la conexión con la base de datos
sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos MySQL'))
  .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

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
