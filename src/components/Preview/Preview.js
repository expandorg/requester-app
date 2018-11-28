import React, { Component } from 'react';

import Content from '../shared/Content';
import PreviewForm from './PreviewForm';
import { authenticated } from '../shared/auth';

import styles from './Preview.module.styl';

class Preview extends Component {
  state = {
    form: null,
  };

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);

    if (window.opener) {
      window.opener.postMessage({ type: 'previewReady' });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data }) => {
    if (typeof data === 'object' && data.type === 'updateForm') {
      this.setState({ form: data.form });
    }
  };

  render() {
    const { form } = this.state;
    return (
      <Content
        title="Preview"
        className={styles.page}
        sidebar={false}
        navbar={false}
      >
        <div className={styles.container}>
          <PreviewForm form={form} />
        </div>
      </Content>
    );
  }
}

export default authenticated(Preview);
