import faker from 'faker';
import { setupBrowser, cleanup } from '../setup';
import { LoginPage, SignupPage } from './po/auth';

let ctx;

beforeAll(async () => {
  ctx = await setupBrowser();
});

describe('Signup', () => {
  it('should signup', async () => {
    const newUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const { page } = ctx;
    await page.goto('http://localhost:3000/');

    const lp = new LoginPage(ctx.page);
    await lp.toggleSignup();

    const sp = new SignupPage(ctx.page);
    await sp.typeEmail(newUser.email);
    await sp.typePassword(newUser.password);

    await sp.submit();
    await sp.waitSubmit();
  }, 20000);
});

afterAll(() => {
  cleanup(ctx.browser);
});
