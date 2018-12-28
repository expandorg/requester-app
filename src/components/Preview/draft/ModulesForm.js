import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@gemsorg/components';
import { formProps } from '@gemsorg/modules';

import FormPreview from '../../shared/FormPreview';

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

  render() {
    const { form, onSubmit, variables } = this.props;

    return (
      <Panel className={styles.container}>
        <FormPreview
          className={styles.form}
          variables={variables}
          form={form}
          onSubmit={onSubmit}
        />
      </Panel>
    );
  }
}
