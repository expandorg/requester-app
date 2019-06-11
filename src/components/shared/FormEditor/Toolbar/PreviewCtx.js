import { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';
import PreviewFormTab from '../../../../common/popups/PreviewFormTab';

const updatePreview = (tab, modules, variables) => {
  if (tab) {
    const wnd = tab.getWindow();
    if (wnd) {
      wnd.postMessage({ type: 'updateForm', form: { modules }, variables });
    }
  }
};

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
    const { modules, variables } = this.props;
    if (prev !== modules) {
      updatePreview(this.tab, modules, variables);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data }) => {
    const { modules, variables } = this.props;
    if (typeof data === 'object' && data.type === 'previewReady') {
      updatePreview(this.tab, modules, variables);
    }
  };

  render() {
    const { children } = this.props;

    return children({
      onPreview: () => {
        if (!this.tab) {
          this.tab = new PreviewFormTab();
        }
        this.tab.open();
      },
    });
  }
}
