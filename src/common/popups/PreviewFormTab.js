// @flow
import { BaseChildWindow } from '@expandorg/app-utils';

export default class PreviewFormTab extends BaseChildWindow {
  constructor() {
    super('_blank', '/preview/form');
  }
}
