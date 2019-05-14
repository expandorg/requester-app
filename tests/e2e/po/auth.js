import Page from './Page';

class AuthForm extends Page {
  static toggleLink = '.gem-auth-link';

  async typeEmail(email) {
    return this.type('input[name=email]', email);
  }

  async typePassword(password) {
    return this.type('input[name=password]', password);
  }

  async submit() {
    await this.click('button[type=submit]');
  }

  async waitSubmit() {
    return this.waitFor('.gem-sidebar');
  }
}

export class LoginPage extends AuthForm {
  async toggleSignup() {
    return this.click(AuthForm.toggleLink);
  }
}

export class SignupPage extends AuthForm {
  async toggleLogin() {
    return this.click(AuthForm.toggleLink);
  }
}
