// @flow

export default class BaseChildWindow {
  name: string;
  baseUrl: string;
  wndProps: ?string;
  wndRef: any = null;

  constructor(name: string, baseUrl: string, props?: string) {
    this.name = name;
    this.baseUrl = baseUrl;
    this.wndProps = props;
  }

  open(data: any) {
    if (!this.wndRef || this.wndRef.closed) {
      this.wndRef = window.open(
        `${this.baseUrl}${this.getUrlParams(data)}`,
        this.name,
        this.wndProps
      );
    } else {
      this.wndRef.focus();
    }
    return this.wndRef;
  }

  getWindow = () => this.wndRef;

  /* eslint-disable no-unused-vars */
  getUrlParams(data: any) {
    return '';
  }
}
