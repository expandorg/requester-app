import { Component } from 'react';

import { draftProps } from '../../../../shared/propTypes';
import PreviewDraftTab from '../../../../../common/popups/PreviewDraftTab';

export default class PreviewCtx extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
  };

  tab = null;

  componentDidUpdate({ draft: prev }) {
    const { draft } = this.props;
    if (prev !== draft) {
      this.updatePreview();
    }
  }

  updatePreview = () => {
    const { draft } = this.props;
    if (this.tab) {
      const wnd = this.tab.getWindow();
      if (wnd) {
        wnd.postMessage({ type: 'updateDraft', draft });
      }
    }
  };

  handlePreviewClick = () => {
    const { draft } = this.props;
    if (!this.tab) {
      this.tab = new PreviewDraftTab(draft.id);
    }
    this.tab.open();
  };

  render() {
    const { children } = this.props;

    return children({ onPreview: this.handlePreviewClick });
  }
}
