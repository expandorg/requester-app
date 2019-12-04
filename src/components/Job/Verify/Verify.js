import React, { useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { moduleControls as mc } from '@expandorg/modules/app';
import { getVerificationResponse as getScore } from '@expandorg/modules/model';

import { RequestStates } from '@expandorg/app-utils';
import LoadIndicator from '../../shared/LoadIndicator';

import { fetchTask } from '../../../sagas/tasksSagas';

import { makeTaskSelector } from '../../../selectors/tasksSelectors';
import { verifyResponseStateSelector } from '../../../selectors/uiStateSelectors';

import ModulesForm from './ModulesForm';

export default function Verify({ response, job, onSubmit }) {
  const dispatch = useDispatch();
  const taskSelector = useMemo(makeTaskSelector);
  const task = useSelector(s => taskSelector(s, response.task_id));

  const verifyState = useSelector(verifyResponseStateSelector);

  useEffect(() => {
    dispatch(fetchTask(response.task_id));
  }, [dispatch, response.task_id]);

  const submit = useCallback(
    data => {
      const result = getScore(data, job.verificationForm, mc);
      onSubmit(response, result.score, result.reason);
    },
    [job.verificationForm, onSubmit, response]
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
    <LoadIndicator isLoading={!task}>
      <ModulesForm
        key={response.id}
        form={job && job.verificationForm}
        variables={variables}
        isSubmitting={verifyState.state === RequestStates.Fetching}
        onSubmit={submit}
      />
    </LoadIndicator>
  );
}

Verify.propTypes = {
  response: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.object,
    task_id: PropTypes.number,
    worker_id: PropTypes.number,
  }).isRequired,
  job: PropTypes.shape({
    id: PropTypes.number,
    verificationForm: PropTypes.object,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
