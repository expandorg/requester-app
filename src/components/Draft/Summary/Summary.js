import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';
import { userSelector } from '@expandorg/app-auth/selectors';

import LoadIndicator from '../../shared/LoadIndicator';
import SummaryForm from './SummaryForm';
import TaskPublishedDialog from './TaskPublishedDialog';

import { draftProps } from '../../shared/propTypes';
import { publish } from '../../../sagas/draftsSagas';
import { publishDraftStateSelector } from '../../../selectors/uiStateSelectors';

export default function Summary({ draft, onStep, onBack, validation }) {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const submitState = useSelector(publishDraftStateSelector);

  const [errors, setErrors] = useState(null);
  const [published, setPublished] = useState(false);

  const complete = useCallback(() => setPublished(true), []);
  const failed = useCallback(({ error }) => setErrors(error), []);

  const publishing = submitState.state === RequestStates.Fetching;

  const submit = useCallback(
    schedule => {
      if (!publishing) {
        dispatch(publish(draft.id, schedule));
      }
    },
    [dispatch, draft.id, publishing]
  );

  return (
    <SubmitStateEffect
      submitState={submitState}
      onComplete={complete}
      onFailed={failed}
    >
      {!published && (
        <LoadIndicator
          isLoading={publishing}
          message="Submitting your task, please wait..."
        >
          <SummaryForm
            user={user}
            draft={draft}
            validation={validation}
            errors={errors}
            onBack={onBack}
            onStep={onStep}
            onSubmit={submit}
          />
        </LoadIndicator>
      )}
      {published && <TaskPublishedDialog draft={draft} />}
    </SubmitStateEffect>
  );
}

Summary.propTypes = {
  draft: draftProps.isRequired,
  validation: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  onStep: PropTypes.func.isRequired,
};
