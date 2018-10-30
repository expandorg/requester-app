// @flow
import BaseChildWindow from './BaseChildWindow';

export default class PreviewTab extends BaseChildWindow {
  constructor() {
    super('_blank', '/preview');
  }

  /* eslint-disable no-unused-vars */
  getUrl(data: any) {
    throw new Error('not implemented');
  }
}
