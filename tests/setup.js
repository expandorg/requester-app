import '@babel/polyfill';
import puppeteer from 'puppeteer';

const WIDTH = 1200;
const HEIGHT = 800;

export async function setupBrowser(width = WIDTH, height = HEIGHT) {
  const params =
    process.env.NODE_ENV === 'e2e-debug'
      ? {
          headless: false,
          slowMo: 80, // 250
          args: [`--window-size=${width},${height}`],
        }
      : {};

  const browser = await puppeteer.launch(params);
  const page = await browser.newPage();
  await page.setViewport({ width, height });

  return { browser, page };
}

export async function cleanup(browser) {
  browser.close();
}
