import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { userProps } from '@expandorg/app-auth';

import { Button } from '@expandorg/components';

import { ReactComponent as Warning } from '@expandorg/uikit/assets/warning.svg';
import HeroWarning from '../../../shared/HeroWarning';

import { Actions, Section, Description } from '../Form';
import { draftProps } from '../../../shared/propTypes';
import { getNavState } from '../../wizard';

import Settings from './Settings';
import Data from './Data/Data';
// import TaskTemplate from './TaskTemplate';
// import Whitelist from './Whitelist';
import TemplateSettings from './TemplateSettings';
import Task from './Task';
import Payout from './Payout';
import PublishButton from './Publish/PublishButton';

import styles from './SummaryForm.module.styl';
import { DraftManager } from '../../../../model/draft';

const getTaskStatus = ({ taskForm }) =>
  taskForm && taskForm.modules && taskForm.modules.length > 0
    ? 'complete'
    : 'required';

export default class SummaryForm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    errors: PropTypes.shape({}),
    draft: draftProps.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onStep: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errors: null,
  };

  handlePublishClick = schedule => {
    const { onSubmit } = this.props;
    onSubmit(schedule);
  };

  render() {
    const { draft, user, onBack, onStep, errors } = this.props;
    const nav = getNavState(draft);
    const draftReady = DraftManager.validate(draft);

    return (
      <div className={styles.form}>
        <Description className={styles.description}>
          Description about this step goes here.
        </Description>
        <Section
          title="Settings"
          status={nav.settings.status}
          blue
          onStep={() => onStep(0)}
        >
          <Settings draft={draft} />
        </Section>
        <Section title="Data" status={nav.data.status} onStep={() => onStep(1)}>
          <Data draft={draft} />
        </Section>
        {/* <Section title="Task" status={nav.templates.status} blue>
          <TaskTemplate draft={draft} />
        </Section> */}
        <Section
          title="Template Settings"
          status="complete"
          blue
          onStep={() => onStep(2)}
        >
          <TemplateSettings draft={draft} />
        </Section>
        <Section
          title="Task"
          status={getTaskStatus(draft)}
          onStep={() => onStep(3)}
        >
          <Task form={draft.taskForm} draft={draft} />
        </Section>
        {/* <Section title="Whitelist" status={nav.whitelist.status}>
          <Whitelist draft={draft} />
        </Section> */}
        <Section
          title="Payout"
          status={nav.pay.status}
          blue
          onStep={() => onStep(4)}
        >
          <Payout draft={draft} />
        </Section>
        <Section>
          {!draftReady && (
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
        <Actions className={styles.actions}>
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
          <PublishButton
            user={user}
            readOnly={!draftReady}
            draft={draft}
            onPublish={this.handlePublishClick}
          />
        </Actions>
      </div>
    );
  }
}
