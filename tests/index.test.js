const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const fs = require('fs');
const app = require('../src/app');

jest.setTimeout(30000);

describe('Teste de Interface (Selenium) - Página Inicial', () => {
  let driver;
  let server;
  let url;

  beforeAll(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        url = `http://localhost:${port}/index`;
        resolve();
      });
    });

    const options = new chrome.Options();
    options.addArguments('--headless=new');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');

    const possiblePaths = [
      process.env.CHROME_BIN,
      '/usr/bin/google-chrome-stable',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ];
    for (const binPath of possiblePaths) {
      if (binPath && fs.existsSync(binPath)) {
        options.setChromeBinaryPath(binPath);
        break;
      }
    }

    let builder = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options);

    if (chromedriver && chromedriver.path) {
      const service = new chrome.ServiceBuilder(chromedriver.path);
      builder = builder.setChromeService(service);
    }

    driver = await builder.build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('deve verificar se no parágrafo está escrito "Em Desenvolvimento"', async () => {
    await driver.get(url);

    const paragrafo = await driver.findElement(By.tagName('p'));
    const texto = await paragrafo.getText();

    expect(texto.trim()).toBe('Em Desenvolvimento');
  });
});
