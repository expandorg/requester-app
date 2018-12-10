import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@gemsorg/components';
import { Form, Module, FormDataProvider, formProps } from '@gemsorg/modules';

import styles from './ModulesForm.module.styl';

export default class ModulesForm extends Component {
  static propTypes = {
    form: formProps.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    formData: { allowedRetries: 3, currentTry: 1 },
  };

  render() {
    const { form, onSubmit } = this.props;
    const { formData } = this.state;

    return (
      <Panel className={styles.container}>
        <FormDataProvider formData={formData}>
          <Form className={styles.form} form={form} onSubmit={onSubmit}>
            {props => <Module {...props} />}
          </Form>
        </FormDataProvider>
      </Panel>
    );
  }
}
