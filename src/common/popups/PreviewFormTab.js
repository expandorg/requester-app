// @flow
import BaseChildWindow from './BaseChildWindow';

export default class PreviewFormTab extends BaseChildWindow {
  constructor() {
    super('_blank', '/preview/form');
  }
}
