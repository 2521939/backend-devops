const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

jest.setTimeout(30000);

describe('Teste de Interface - Página Inicial', () => {
  let driver;

  beforeAll(async () => {
    if (process.env.PATH) {
      process.env.PATH = process.env.PATH
        .split(':')
        .filter((dir) => !dir.includes('node_modules'))
        .join(':');
    }

    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  test('deve checar se o parágrafo no index.html contém o texto "Em Desenvolvimento"', async () => {
    const caminhoHtml = path.resolve(__dirname, '../src/views/index.html');
    await driver.get(`file://${caminhoHtml}`);

    const paragrafo = await driver.findElement(By.tagName('p'));
    const texto = await paragrafo.getText();

    expect(texto.trim()).toBe('Em Desenvolvimento');
  });
});
