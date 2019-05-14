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

  async submitAuthForm(email, password) {
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.submit();
    return this.waitSubmit();
  }
}

export class SignupPage extends AuthForm {
  async signupUser(email, password) {
    return this.submitAuthForm(email, password);
  }
}

export class LoginPage extends AuthForm {
  async toggleSignup() {
    await this.click(AuthForm.toggleLink);
    return new SignupPage(this.page);
  }

  async loginUser(email, password) {
    return this.submitAuthForm(email, password);
  }
}
