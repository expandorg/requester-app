// @flow
import { BaseChildWindow } from '@expandorg/app-utils';

export default class PreviewTemplateTab extends BaseChildWindow {
  constructor(id: string) {
    super('_blank', `/preview/template/${id}`);
  }
}
