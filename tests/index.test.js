const request = require('supertest');
const app = require('../src/app');

describe('GET /index', () => {
  test('deve retornar status 200 e conter "Em Desenvolvimento" no parágrafo', async () => {
    const response = await request(app).get('/index');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);

    // Valida que a tag <p> contém o texto "Em Desenvolvimento"
    expect(response.text).toMatch(/<p[^>]*>[\s\S]*?Em Desenvolvimento[\s\S]*?<\/p>/);
  });
});
