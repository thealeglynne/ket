const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('chat_db', 'root', 'tu_contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definir el modelo User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'moderator'),
    allowNull: false,
  },
}, {
  timestamps: true,
});

sequelize.sync()  // Sincroniza la base de datos
  .then(() => console.log('Tabla User sincronizada'))
  .catch((err) => console.error('No se pudo sincronizar la tabla User:', err));

module.exports = User;
