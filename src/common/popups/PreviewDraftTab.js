// @flow
import BaseChildWindow from './BaseChildWindow';

export default class PreviewDraftTab extends BaseChildWindow {
  constructor(id: string) {
    super('_blank', `/preview/draft/${id}`);
  }
}
