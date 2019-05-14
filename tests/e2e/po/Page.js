export default class Page {
  constructor(page) {
    this.page = page;
  }

  async click(selector) {
    return this.page.click(selector);
  }

  async type(selector, value) {
    return this.page.type(selector, value);
  }

  async waitFor(selector) {
    return this.page.waitForSelector(selector);
  }
}
