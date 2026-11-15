const request = require('supertest');
const app = require('../src/app');

test('GET /projetos retorna a lista com os objetos e status 200', async () => {
  const response = await request(app).get('/projetos');

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});



test('POST /projetos cria um novo projeto com sucesso e retorna status 201', async () => {
  const novoProjeto = {
    nome: 'Projeto DevOps',
    valor: 250,
    descricao: 'Automação de testes'
  };

  const response = await request(app)
    .post('/projetos')
    .send(novoProjeto);

  expect(response.status).toBe(201);
  expect(response.body.mensagem).toBe('Projeto criado com sucesso!');
  expect(response.body.projeto.nome).toBe(novoProjeto.nome);
});



test('POST /projetos retorna status 400 ao tentar criar projeto sem descrição', async () => {
  const projetoSemDescricao = {
    nome: 'Projeto Sem Descrição',
    valor: 150
    // descricao omitida
  };

  const response = await request(app)
    .post('/projetos')
    .send(projetoSemDescricao);

  expect(response.status).toBe(400);
  expect(response.body.erro).toBe('Os campos nome, valor e descricao são obrigatórios.');
});

test('PUT /projetos/:id atualiza um projeto existente e retorna status 200', async () => {
  const dadosAtualizados = {
    nome: 'Francisco Atualizado',
    valor: 200,
    descricao: 'Nova descrição'
  };

  const response = await request(app)
    .put('/projetos/1')
    .send(dadosAtualizados);

  expect(response.status).toBe(200);
  expect(response.body.mensagem).toBe('Projeto atualizado com sucesso!');
  expect(response.body.projeto.nome).toBe(dadosAtualizados.nome);
  expect(response.body.projeto.valor).toBe(dadosAtualizados.valor);
  expect(response.body.projeto.descricao).toBe(dadosAtualizados.descricao);
});

test('DELETE /projetos/:id remove um projeto existente e retorna status 200', async () => {
  const response = await request(app).delete('/projetos/2');

  expect(response.status).toBe(200);
  expect(response.body.mensagem).toBe('Projeto removido com sucesso!');
  expect(response.body.projeto.id).toBe(2);
});