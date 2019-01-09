// @flow
import { BaseChildWindow } from '@expandorg/app-utils';

export default class PreviewDraftTab extends BaseChildWindow {
  constructor(id: string) {
    super('_blank', `/preview/draft/${id}`);
  }
}
