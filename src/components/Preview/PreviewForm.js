import React, { Component } from 'react';

import Content from '../shared/Content';
import { authenticated } from '../shared/auth';

import ModulesForm from './draft/ModulesForm';

import styles from './PreviewForm.module.styl';

class PreviewForm extends Component {
  state = {
    form: null,
    variables: null,
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
      this.setState({ form: data.form, variables: data.variables });
    }
  };

  handleSubmit = values => {
    console.log(JSON.stringify(values, undefined, 2));
  };

  render() {
    const { form, variables } = this.state;
    if (!form) {
      return null;
    }

    return (
      <Content
        title="Preview"
        className={styles.page}
        sidebar={false}
        navbar={false}
      >
        <ModulesForm
          form={form}
          variables={variables}
          onSubmit={this.handleSubmit}
        />
      </Content>
    );
  }
}

export default authenticated(PreviewForm);
