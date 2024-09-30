require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const { Sequelize } = require('sequelize');

// Conexão com o banco de dados utilizando variáveis de ambiente
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',  // Valor padrão para o host
    dialect: 'mysql',                          // Tipo de banco de dados
    port: process.env.DB_PORT || 3306,         // Porta padrão do MySQL
    logging: console.log,                      // Exibe queries no console (opcional)
});

// Testa a conexão ao banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;
