import React, { useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from '@expandorg/components';
import { Navbar } from '@expandorg/components/app';

import Verify from './Verify';

import { makeJobSelector } from '../../../selectors/jobSelectos';
import { makeNextPendingResponseSelector } from '../../../selectors/jobResponsesSelectors';

import {
  fetchPendingResponses,
  verifyResponse,
} from '../../../sagas/responseSagas';

import { fetchJob } from '../../../sagas/jobSagas';

import styles from './VerifyDialog.module.styl';

export default function VerifyDialog({ jobId, onHide, left }) {
  const dispatch = useDispatch();

  const jobSelector = useMemo(makeJobSelector);
  const job = useSelector(s => jobSelector(s, jobId));

  const pendingResponseSelector = useMemo(makeNextPendingResponseSelector);
  const response = useSelector(s => pendingResponseSelector(s, jobId));

  useEffect(() => {
    dispatch(fetchPendingResponses(jobId));
    dispatch(fetchJob(jobId));
  }, [dispatch, jobId]);

  const submit = useCallback(
    // eslint-disable-next-line camelcase
    ({ task_id, id, worker_id }, score, reason) => {
      dispatch(verifyResponse(jobId, task_id, id, worker_id, score, reason));
    },
    [dispatch, jobId]
  );

  useEffect(() => {
    if (!left) {
      onHide();
    }
  }, [left, onHide]);

  if (!job) {
    return null;
  }

  return (
    <Dialog
      visible
      onHide={onHide}
      modalClass={styles.modal}
      overlayClass={styles.overlay}
      contentLabel="verify-dialog"
    >
      <Navbar title={`${left} responses left to verify`} top={false} />
      {response && <Verify response={response} job={job} onSubmit={submit} />}
    </Dialog>
  );
}

VerifyDialog.propTypes = {
  jobId: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
};
