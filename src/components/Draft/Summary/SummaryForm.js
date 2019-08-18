import React from 'react';
import PropTypes from 'prop-types';

import { userProps } from '@expandorg/app-auth';

import { Button } from '@expandorg/components';

import { ReactComponent as Warning } from '@expandorg/uikit/assets/warning.svg';
import HeroWarning from '../../shared/HeroWarning';

import { Actions, Section, Description } from '../controls';
import { draftProps } from '../../shared/propTypes';

import Settings from './Settings';
import Data from './Data/Data';
// import TaskTemplate from './TaskTemplate';
// import Whitelist from './Whitelist';
import TemplateSettings from './TemplateSettings';
import Task from './Task';
import Payout from './Payout';
import PublishButton from './Publish/PublishButton';

import WizardSteps from '../WizardSteps';

import styles from './SummaryForm.module.styl';
import DraftValidator from '../../../model/DraftValidator';

export default function SummaryForm({
  draft,
  user,
  onBack,
  onStep,
  errors,
  validation,
  onSubmit,
}) {
  const isReady = DraftValidator.isReadyToPublish(validation, draft);

  return (
    <div className={styles.form}>
      <Description className={styles.description}>
        Review your task to confirm everything looks as intended.
      </Description>
      <Section
        title="Task Settings"
        onStep={() => onStep(WizardSteps.Settings)}
      >
        <Settings draft={draft} />
      </Section>
      <Section title="Data" onStep={() => onStep(WizardSteps.Data)}>
        <Data draft={draft} />
      </Section>

      <Section
        title="Template Settings"
        onStep={() => onStep(WizardSteps.Settings)}
      >
        <TemplateSettings draft={draft} />
      </Section>
      <Section title="Task" onStep={() => onStep(WizardSteps.Forms)}>
        <Task form={draft.taskForm} draft={draft} />
      </Section>
      {/* <Section title="Whitelist" >
          <Whitelist draft={draft} />
        </Section> */}
      <Section title="Payout" onStep={() => onStep(WizardSteps.Pay)}>
        <Payout draft={draft} />
      </Section>
      <Section>
        {!isReady && (
          <HeroWarning
            icon={<Warning width="64px" height="64px" viewBox="0 0 42 42" />}
          >
            There are still some sections that need completing.
            <br />
            The task can not be published until all sections are complete.
          </HeroWarning>
        )}
        {errors && (
          <HeroWarning
            icon={<Warning width="64px" height="64px" viewBox="0 0 42 42" />}
          >
            {errors.commonMessage}
          </HeroWarning>
        )}
      </Section>
      <Actions>
        <Button theme="secondary" onClick={onBack}>
          Back
        </Button>
        <PublishButton
          user={user}
          readOnly={!isReady}
          draft={draft}
          onPublish={schedule => onSubmit(schedule)}
        />
      </Actions>
    </div>
  );
}

SummaryForm.propTypes = {
  user: userProps.isRequired,
  errors: PropTypes.shape({
    commonMessage: PropTypes.string,
  }),
  draft: draftProps.isRequired,
  validation: PropTypes.shape({
    commonMessage: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onStep: PropTypes.func.isRequired,
};

SummaryForm.defaultProps = {
  errors: null,
};
