import { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';
import PreviewTab from '../../../../common/popups/PreviewTab';

export default class Editor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
  };

  static defaultProps = {
    modules: [],
  };

  tab = null;

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);
  }

  componentDidUpdate({ modules: prev }) {
    const { modules } = this.props;
    if (prev !== modules) {
      this.updatePreview();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data }) => {
    if (typeof data === 'object' && data.type === 'previewReady') {
      this.updatePreview();
    }
  };

  updatePreview = () => {
    const { modules } = this.props;
    if (this.tab) {
      const wnd = this.tab.getWindow();
      if (wnd) {
        wnd.postMessage({ type: 'updateForm', form: { modules } });
      }
    }
  };

  handlePreviewClick = () => {
    if (!this.tab) {
      this.tab = new PreviewTab();
    }
    this.tab.open();
  };

  render() {
    const { children } = this.props;

    return children({ onPreview: this.handlePreviewClick });
  }
}
