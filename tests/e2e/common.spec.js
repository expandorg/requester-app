/* eslint-disable prefer-destructuring */
import { setupBrowser, cleanup } from '../setup';

let browser;
let page;

beforeAll(async () => {
  const instance = await setupBrowser();
  browser = instance.browser;
  page = instance.page;
});

describe('Testing auth', async () => {
  test('signup', async () => {
    await page.goto('http://localhost:3000/');
  });
});

afterAll(() => {
  cleanup(browser);
});
