require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { sequelize } = require('./models/Capivara.js'); // Importar a conexão ao banco de dados
const capivaraRoutes = require('./routes/capivaraRoutes'); // Importar as rotas de capivara

const app = express();

// Middleware para logar os cabeçalhos de todas as requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Configuração do CORS para permitir acesso do frontend na porta 5002
app.use(cors({
  origin: 'http://localhost:5002', // Atualize isso com o endereço correto do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Limitar os métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Limitar os cabeçalhos permitidos
}));

// Middleware para parsing de JSON no body
app.use(bodyParser.json());

// Sincronizar o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Banco de dados sincronizado sem recriar tabelas!');
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });

// Usar as rotas de capivara
app.use('/api', capivaraRoutes); // A rota '/api' será o prefixo para todas as rotas de capivara

// Servir arquivos estáticos do front-end compilado
app.use(express.static(path.join(__dirname, 'dist')));

// Rota 404 - Não Encontrado
app.use((req, res, next) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Para qualquer rota não especificada acima, servir o index.html (Front-end)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Porta do servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
