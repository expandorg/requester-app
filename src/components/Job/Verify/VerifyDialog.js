import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { Dialog } from '@expandorg/components';
import { Navbar } from '@expandorg/components/app';

import Verify from './Verify';

import { makeJobSelector } from '../../../selectors/jobSelectos';
import { makeNextPendingResponseSelector } from '../../../selectors/jobResponsesSelectors';

import { fetchPendingResponses } from '../../../sagas/responseSagas';
import { fetchJob } from '../../../sagas/jobSagas';

import styles from './VerifyDialog.module.styl';

export default function VerifyDialog({ jobId, onHide, left }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingResponses(jobId));
    dispatch(fetchJob(jobId));
  }, [dispatch, jobId]);

  const pendingResponseSelector = useMemo(makeNextPendingResponseSelector);
  const response = useSelector(s => pendingResponseSelector(s, jobId));

  const jobSelector = useMemo(makeJobSelector);
  const job = useSelector(s => jobSelector(s, jobId));

  if (!job || !response) {
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
      <Verify response={response} job={job} />
    </Dialog>
  );
}

VerifyDialog.propTypes = {
  jobId: PropTypes.number.isRequired,
  left: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
