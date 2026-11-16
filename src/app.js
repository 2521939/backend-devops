const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

const simulacaoDB = [
  { id: 1, nome: "Francisco", valor: 100, descricao: "a"},
  { id: 2, nome: "João", valor: 30, descricao: "b"},
  { id: 3, nome: "Gabriel", valor: 145, descricao: "c"}
];

app.get('/index', (req, res) => {
    res.sendFile('views/index.html', { root: __dirname });
});

app.get('/projetos', (req, res) => {
  res.status(200).json(simulacaoDB);
});

app.post('/projetos', (req, res) => {
  const { nome, valor, descricao } = req.body;

  if (!nome || valor === undefined || valor === null || !descricao) {
    return res.status(400).json({
      erro: 'Os campos nome, valor e descricao são obrigatórios.'
    });
  }

  const novoId = simulacaoDB.length > 0
    ? Math.max(...simulacaoDB.map(item => item.id)) + 1
    : 1;

  const novoProjeto = {
    id: novoId,
    nome,
    valor,
    descricao
  };

  simulacaoDB.push(novoProjeto);

  return res.status(201).json({
    mensagem: 'Projeto criado com sucesso!',
    projeto: novoProjeto
  });
});

app.put('/projetos/:id', (req, res) => {
  const id = Number(req.params.id);
  const projeto = simulacaoDB.find(item => item.id === id);

  if (!projeto) {
    return res.status(404).json({ erro: 'Projeto não encontrado.' });
  }

  const { nome, valor, descricao } = req.body;

  if (nome !== undefined) projeto.nome = nome;
  if (valor !== undefined) projeto.valor = valor;
  if (descricao !== undefined) projeto.descricao = descricao;

  return res.status(200).json({
    mensagem: 'Projeto atualizado com sucesso!',
    projeto
  });
});

app.delete('/projetos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = simulacaoDB.findIndex(item => item.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Projeto não encontrado.' });
  }

  const [projetoRemovido] = simulacaoDB.splice(index, 1);

  return res.status(200).json({
    mensagem: 'Projeto removido com sucesso!',
    projeto: projetoRemovido
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
  });
}

module.exports = app;