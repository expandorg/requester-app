import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@gemsorg/components';
import { Form, Module, FormDataProvider, formProps } from '@gemsorg/modules';

import styles from './ModulesForm.module.styl';

export default class ModulesForm extends Component {
  static propTypes = {
    form: formProps.isRequired,
    variables: PropTypes.object, // eslint-disable-line
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: null,
  };

  state = {
    formData: { allowedRetries: 3, currentTry: 1 },
  };

  render() {
    const { form, onSubmit, variables } = this.props;
    const { formData } = this.state;

    return (
      <Panel className={styles.container}>
        <FormDataProvider formData={formData}>
          <Form
            variables={variables}
            className={styles.form}
            form={form}
            onSubmit={onSubmit}
          >
            {props => <Module {...props} />}
          </Form>
        </FormDataProvider>
      </Panel>
    );
  }
}
