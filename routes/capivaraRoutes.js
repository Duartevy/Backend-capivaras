const express = require('express');
const Capivara = require('../models/Capivara'); // Importa o modelo Capivara
const router = express.Router();

// Rota GET - Retorna todas as capivaras
router.get('/capivaras', async (req, res) => {
  try {
    const capivaras = await Capivara.findAll();
    res.json(capivaras);
  } catch (error) {
    console.error('Erro ao buscar capivaras:', error);
    res.status(500).json({ message: 'Erro ao buscar capivaras.' });
  }
});

// Rota POST - Adiciona uma nova capivara
router.post('/capivaras', async (req, res) => {
  const { Nome, Idade, Peso } = req.body;

  // Validação básica
  if (!Nome || !Idade || !Peso) {
    return res.status(400).json({ message: 'Nome, Idade e Peso são obrigatórios.' });
  }

  try {
    const novaCapivara = await Capivara.create(req.body);
    res.status(201).json(novaCapivara);
  } catch (error) {
    console.error('Erro ao adicionar capivara:', error);
    res.status(500).json({ message: 'Erro ao adicionar capivara.' });
  }
});

// Rota PUT - Atualiza uma capivara existente
router.put('/capivaras/:nome', async (req, res) => {
  try {
    const { nome } = req.params;
    const capivara = await Capivara.findOne({ where: { Nome: nome } });

    if (!capivara) {
      return res.status(404).json({ message: 'Capivara não encontrada.' });
    }

    const { Idade, Peso } = req.body;
    if (!Idade || !Peso) {
      return res.status(400).json({ message: 'Idade e Peso são obrigatórios para a atualização.' });
    }

    await capivara.update(req.body);
    res.json({ message: 'Capivara atualizada com sucesso', capivara });
  } catch (error) {
    console.error('Erro ao atualizar capivara:', error);
    res.status(500).json({ message: 'Erro ao atualizar capivara.' });
  }
});

// Rota DELETE - Remove uma capivara existente
router.delete('/capivaras/:nome', async (req, res) => {
  try {
    const { nome } = req.params;
    const capivara = await Capivara.findOne({ where: { Nome: nome } });

    if (!capivara) {
      return res.status(404).json({ message: 'Capivara não encontrada.' });
    }

    await capivara.destroy();
    res.status(204).json({ message: 'Capivara removida com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir capivara:', error);
    res.status(500).json({ message: 'Erro ao excluir capivara.' });
  }
});

module.exports = router;
