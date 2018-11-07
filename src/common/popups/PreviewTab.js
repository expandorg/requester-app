// @flow
import BaseChildWindow from './BaseChildWindow';

export default class PreviewTab extends BaseChildWindow {
  constructor() {
    super('_blank', '/preview');
  }
}
