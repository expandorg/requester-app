import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import OnboardingComplete from './OnboardingComplete';
import TaskComplete from './TaskComplete';
import FormPreview from '../../shared/FormPreview';

import { draftProps } from '../../shared/propTypes';
import { TaskWorkflowBackend as Backend, TaskWorkflowState } from '../workflow';

import styles from './PreviewDraftWorkflow.module.styl';

export default function PreviewDraftWorkflow({ draft, variables, onNotify }) {
  const [workflow, setWorkflow] = useState(Backend.getNextState(draft));

  useEffect(() => {
    setWorkflow(Backend.getNextState(draft));
  }, [draft]);

  const submit = useCallback(
    (...args) => {
      setWorkflow(Backend.getNextState(draft, workflow, ...args));
    },
    [draft, workflow]
  );

  return (
    <>
      {workflow.state === TaskWorkflowState.ONBOARDING_PASSED && (
        <OnboardingComplete draft={draft} onSubmit={submit} />
      )}
      {workflow.state === TaskWorkflowState.ONBOARDING_GROUP && (
        <div className={styles.container}>
          <FormPreview
            form={workflow.form}
            onSubmit={submit}
            onNotify={onNotify}
          />
        </div>
      )}
      {workflow.state === TaskWorkflowState.TASK && (
        <div className={styles.container}>
          <FormPreview
            form={workflow.form}
            variables={variables}
            onSubmit={submit}
            onNotify={onNotify}
          />
        </div>
      )}
      {workflow.state === TaskWorkflowState.VERIFICATION && (
        <div className={styles.container}>
          <FormPreview
            form={workflow.form}
            variables={{ ...variables, ...workflow.response }}
            onSubmit={submit}
            onNotify={onNotify}
          />
        </div>
      )}
      {workflow.state === TaskWorkflowState.REPEAT && (
        <TaskComplete draft={draft} onSubmit={submit} />
      )}
    </>
  );
}

PreviewDraftWorkflow.propTypes = {
  draft: draftProps.isRequired,
  variables: PropTypes.object, // eslint-disable-line
  onNotify: PropTypes.func,
};

PreviewDraftWorkflow.defaultProps = {
  variables: null,
  onNotify: Function.prototype,
};
