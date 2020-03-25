import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import {
  Form,
  Module,
  FormDataProvider,
  formProps,
  FileUploadServiceMock,
} from '@expandorg/modules';

import { moduleControls } from '@expandorg/modules/app';

import styles from './FormPreview.module.styl';

const services = new Map([['fileUpload', new FileUploadServiceMock()]]);

export default function FormPreview({
  formData,
  form,
  variables,
  className,
  onSubmit,
  onNotify,
  readOnly,
}) {
  if (!form || !form.modules || !form.modules.length) {
    return <div className={styles.empty}>Form is empty</div>;
  }

  const classes = cn(styles.form, className, { [styles.readOnly]: readOnly });

  return (
    <FormDataProvider formData={formData}>
      <Form
        className={classes}
        form={form}
        controls={moduleControls}
        services={services}
        variables={variables}
        onSubmit={onSubmit}
        onNotify={onNotify}
      >
        {(props) => <Module {...props} />}
      </Form>
    </FormDataProvider>
  );
}

FormPreview.propTypes = {
  form: formProps,
  variables: PropTypes.shape({}),
  formData: PropTypes.shape({
    allowedRetries: PropTypes.number,
    currentTry: PropTypes.number,
  }),
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,
  onNotify: PropTypes.func,
};

FormPreview.defaultProps = {
  form: null,
  variables: null,
  readOnly: false,
  className: null,
  onSubmit: Function.prototype,
  onNotify: Function.prototype,
  formData: { allowedRetries: 3, currentTry: 1 },
};
