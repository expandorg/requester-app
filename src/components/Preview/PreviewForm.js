import React, { Component } from 'react';

import { Sidebar, Navbar } from '@expandorg/components/app';
import { Panel } from '@expandorg/components';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import ModulesForm from './draft/ModulesForm';

import styles from './styles.module.styl';

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
      <Page title="Preview" className={styles.page}>
        <Navbar />
        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.panel}>
            <ModulesForm
              form={form}
              variables={variables}
              onSubmit={this.handleSubmit}
            />
          </Panel>
        </div>
      </Page>
    );
  }
}

export default authenticated(PreviewForm);
