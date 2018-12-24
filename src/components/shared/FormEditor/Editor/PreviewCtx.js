import { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';
import PreviewFormTab from '../../../../common/popups/PreviewFormTab';

export default class PreviewCtx extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    variables: PropTypes.object, // eslint-disable-line
  };

  static defaultProps = {
    modules: [],
    variables: null,
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
    const { modules, variables } = this.props;
    if (this.tab) {
      const wnd = this.tab.getWindow();
      if (wnd) {
        wnd.postMessage({ type: 'updateForm', form: { modules }, variables });
      }
    }
  };

  handlePreviewClick = () => {
    if (!this.tab) {
      this.tab = new PreviewFormTab();
    }
    this.tab.open();
  };

  render() {
    const { children } = this.props;

    return children({ onPreview: this.handlePreviewClick });
  }
}
