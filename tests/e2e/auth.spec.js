import faker from 'faker';
import { setupBrowser, cleanup } from '../setup';
import { LoginPage } from './po/auth';

let ctx;

beforeAll(async () => {
  ctx = await setupBrowser();
});

describe('Signup', () => {
  it('should signup with new user', async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { page } = ctx;
    await page.goto('http://localhost:3000/');

    const login = new LoginPage(ctx.page);

    const signup = await login.toggleSignup();

    await signup.typeEmail(newUser.email);
    await signup.typePassword(newUser.password);

    await signup.submit();
    await signup.waitSubmit();

    const title = await page.$eval('.gem-navbar-title', el => el.textContent);
    expect(title).toBe('Dashboard');
  }, 20000);
});

afterAll(() => {
  cleanup(ctx.browser);
});
