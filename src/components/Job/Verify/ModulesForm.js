import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@expandorg/components';
import { useDispatch } from 'react-redux';

import {
  Form,
  Module,
  formProps,
  FormDataProvider,
  FileUploadServiceMock,
} from '@expandorg/modules';

import { moduleControls } from '@expandorg/modules/app';
import { addNotification } from '@expandorg/app-utils/app';

import styles from './ModulesForm.module.styl';

const fd = {};
const services = new Map([['fileUpload', new FileUploadServiceMock()]]);

export default function ModulesForm({
  form,
  variables,
  isSubmitting,
  onSubmit,
}) {
  const dispatch = useDispatch();

  const notify = useCallback(
    (type, msg) => dispatch(addNotification(type, msg)),
    [dispatch]
  );

  return (
    <Panel className={styles.panel}>
      <FormDataProvider formData={fd}>
        <Form
          className={styles.form}
          form={form}
          controls={moduleControls}
          services={services}
          variables={variables}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          onNotify={notify}
        >
          {mp => <Module {...mp} />}
        </Form>
      </FormDataProvider>
    </Panel>
  );
}

ModulesForm.propTypes = {
  form: formProps,
  variables: PropTypes.shape({}),
  isSubmitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ModulesForm.defaultProps = {
  form: null,
  variables: null,
};
