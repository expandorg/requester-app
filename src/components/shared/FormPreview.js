import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Form, Module, FormDataProvider, formProps } from '@gemsorg/modules';

import styles from './FormPreview.module.styl';

export default class FormPreview extends Component {
  static propTypes = {
    form: formProps,
    variables: PropTypes.shape({}),
    formData: PropTypes.shape({
      allowedRetries: PropTypes.number,
      currentTry: PropTypes.number,
    }),
    className: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    form: null,
    variables: null,
    className: null,
    onSubmit: Function.prototype,
    formData: { allowedRetries: 3, currentTry: 1 },
  };

  render() {
    const { formData, form, variables, className, onSubmit } = this.props;

    if (!form || !form.modules || !form.modules.length) {
      return <div className={styles.empty}>Form is empty</div>;
    }

    return (
      <FormDataProvider formData={formData}>
        <Form
          className={cn(styles.form, className)}
          variables={variables}
          form={form}
          onSubmit={onSubmit}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}
