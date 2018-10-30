import React, { Component } from 'react';

import { Panel } from '@gemsorg/components';
import { Form, Module, formProps, FormDataProvider } from '@gemsorg/modules';

import styles from './PreviewForm.module.styl';

export default class PreviewForm extends Component {
  static propTypes = {
    form: formProps,
  };

  static defaultProps = {
    form: null,
  };

  state = {
    formData: { allowedRetries: 3, currentTry: 1 },
  };

  handleSubmit = values => {
    console.log(JSON.stringify(values, undefined, 2));
  };

  render() {
    const { form } = this.props;
    const { formData } = this.state;

    if (!form) {
      return null;
    }

    return (
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
    );
  }
}
