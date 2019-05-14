import Page from './Page';

class AuthForm extends Page {
  static toggleSelector = '.gem-auth-link';
  static emailSelector = 'input[name=email]';
  static passwordSelector = 'input[name=password]';
  static sidebarSelector = '.gem-sidebar';

  async typeEmail(email) {
    return this.type(AuthForm.emailSelector, email);
  }

  async typePassword(password) {
    return this.type(AuthForm.passwordSelector, password);
  }

  async waitSubmit() {
    return this.waitFor(AuthForm.sidebarSelector);
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
    await this.click(AuthForm.toggleSelector);
    return new SignupPage(this.page);
  }

  async loginUser(email, password) {
    return this.submitAuthForm(email, password);
  }
}
