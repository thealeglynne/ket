const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('chat_db', 'root', 'tu_contraseña', {
  host: 'localhost',
  dialect: 'mysql',
});

// Definir el modelo Message
const Message = sequelize.define('Message', {
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isModerator: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

sequelize.sync()  // Sincroniza la base de datos
  .then(() => console.log('Tabla Message sincronizada'))
  .catch((err) => console.error('No se pudo sincronizar la tabla Message:', err));

module.exports = Message;
