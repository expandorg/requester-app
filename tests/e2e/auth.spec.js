import faker from 'faker';
import { setupBrowser, cleanup } from '../setup';
import { LoginPage, SignupPage } from './po/auth';

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
  }, 20000);
});

afterAll(() => {
  cleanup(ctx.browser);
});
