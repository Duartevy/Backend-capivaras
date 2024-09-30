const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se de apontar para a configuração do banco de dados

const Capivara = sequelize.define('Capivara', {
  Nome: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Peso: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  'Status de Saúde': {
    type: DataTypes.STRING,
  },
  Habitat: {
    type: DataTypes.STRING,
  },
  Comportamento: {
    type: DataTypes.STRING,
  },
  Dieta: {
    type: DataTypes.STRING,
  },
  Observações: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false
});

module.exports = Capivara;
