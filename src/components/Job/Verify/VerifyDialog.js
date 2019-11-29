import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from '@expandorg/components';

import { moduleControls as mc } from '@expandorg/modules/app';
import { getVerificationResponse as getScore } from '@expandorg/modules/model';

import { RequestStates } from '@expandorg/app-utils';

import { fetchTask } from '../../../sagas/tasksSagas';
import { verifyResponse } from '../../../sagas/responseSagas';

import { makeTaskSelector } from '../../../selectors/tasksSelectors';
import { verifyResponseStateSelector } from '../../../selectors/uiStateSelectors';

import ModulesForm from './ModulesForm';

import styles from './VerifyDialog.module.styl';

export default function VerifyDialog({ response, job, onHide }) {
  const dispatch = useDispatch();
  const taskSelector = useMemo(makeTaskSelector);
  const task = useSelector(s => taskSelector(s, response.task_id));

  const verifyState = useSelector(verifyResponseStateSelector);

  useEffect(() => {
    dispatch(fetchTask(response.task_id));
  }, [dispatch, response.task_id]);

  const submit = useCallback(
    data => {
      const { score, reason } = getScore(data, job.VerificationForm, mc);
      dispatch(
        verifyResponse(job.id, response.task_id, response.id, score, reason)
      );
    },
    [dispatch, job, response.id, response.task_id]
  );

  const variables = useMemo(
    () => ({
      workerId: response.worker_id,
      ...((task && task.taskData) || {}),
      ...(response.value || {}),
    }),
    [response.value, response.worker_id, task]
  );

  return (
    <Dialog
      visible
      onHide={onHide}
      modalClass={styles.modal}
      overlayClass={styles.overlay}
      contentLabel="verify-dialog"
      hideButton
    >
      <ModulesForm
        key={response.id}
        form={job && job.VerificationForm}
        variables={variables}
        isSubmitting={verifyState.state === RequestStates.Fetching}
        onSubmit={submit}
      />
    </Dialog>
  );
}

VerifyDialog.propTypes = {
  response: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.object,
    task_id: PropTypes.number,
    worker_id: PropTypes.number,
  }).isRequired,
  job: PropTypes.shape({
    id: PropTypes.string,
    VerificationForm: PropTypes.object,
  }).isRequired,
  onHide: PropTypes.func.isRequired,
};
