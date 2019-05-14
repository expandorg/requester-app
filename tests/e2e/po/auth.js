import Page from './Page';

class AuthForm extends Page {
  static toggleLink = '.gem-auth-link';

  async typeEmail(email) {
    return this.type('input[name=email]', email);
  }

  async typePassword(password) {
    return this.type('input[name=password]', password);
  }

  async waitSubmit() {
    return this.waitFor('.gem-sidebar');
  }
}

export class SignupPage extends AuthForm {}

export class LoginPage extends AuthForm {
  async toggleSignup() {
    await this.click(AuthForm.toggleLink);
    return new SignupPage(this.page);
  }
}
