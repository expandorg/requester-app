import React, { Component } from 'react';

import { Panel } from '@gemsorg/components';
import { Form, Module, FormDataProvider } from '@gemsorg/modules';

import Content from '../shared/Content';
import { authenticated } from '../shared/auth';

import styles from './PreviewForm.module.styl';

class PreviewForm extends Component {
  state = {
    form: null,
    formData: { allowedRetries: 3, currentTry: 1 },
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

  handleSubmit = values => {
    console.log(JSON.stringify(values, undefined, 2));
  };

  render() {
    const { form, formData } = this.state;
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
        <Panel className={styles.container}>
          <FormDataProvider formData={formData}>
            <Form
              className={styles.form}
              form={form}
              onSubmit={this.handleSubmit}
            >
              {props => <Module {...props} />}
            </Form>
          </FormDataProvider>
        </Panel>
      </Content>
    );
  }
}

export default authenticated(PreviewForm);
