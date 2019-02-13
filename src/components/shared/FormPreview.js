import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Form, Module, FormDataProvider, formProps } from '@expandorg/modules';
import FileUploadServiceMock from '@expandorg/modules/src/form/ModulesPlayground/FileUploadServiceMock';

import styles from './FormPreview.module.styl';

const fileUploadService = new FileUploadServiceMock();

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
    onNotify: PropTypes.func,
  };

  static defaultProps = {
    form: null,
    variables: null,
    className: null,
    onSubmit: Function.prototype,
    onNotify: Function.prototype,
    formData: { allowedRetries: 3, currentTry: 1, fileUploadService },
  };

  render() {
    const {
      formData,
      form,
      variables,
      className,
      onSubmit,
      onNotify,
    } = this.props;

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
          onNotify={onNotify}
        >
          {props => <Module {...props} />}
        </Form>
      </FormDataProvider>
    );
  }
}
