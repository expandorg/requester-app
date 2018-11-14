import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/Button';
import HeroWarning from '../../../shared/HeroWarning';

import { Actions, Section, Form, Description } from '../Form';
import { draftProps } from '../../../shared/propTypes';
import { getNavState, isDraftReady } from '../../wizard';

import { ReactComponent as Warning } from '../../../assets/warning.svg';

import Settings from './Settings';
import Data from './Data/Data';
import Task from './Task';
import Whitelist from './Whitelist';
import Payout from './Payout';
import PublishButton from './Publish/PublishButton';

import styles from './SummaryForm.module.styl';

export default class SummaryForm extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onBack: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  handlePublishClick = time => {
    const { onSubmit } = this.props;
    onSubmit(time);
  };

  render() {
    const { draft, onBack } = this.props;

    const nav = getNavState(draft);
    const draftReady = isDraftReady(draft);

    return (
      <Form className={styles.form}>
        <Description className={styles.description}>
          Description about this step goes here.
        </Description>
        <Section title="Settings" status={nav.settings.status} blue>
          <Settings draft={draft} />
        </Section>
        <Section title="Data" status={nav.upload.status}>
          <Data draft={draft} />
        </Section>
        <Section title="Task" status={nav.templates.status} blue>
          <Task draft={draft} />
        </Section>
        <Section title="Whitelist" status={nav.whitelist.status}>
          <Whitelist draft={draft} />
        </Section>
        <Section title="Payout" status={nav.pay.status} blue>
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
        </Section>
        <Actions className={styles.actions}>
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
          <PublishButton
            readOnly={!draftReady}
            onPublish={this.handlePublishClick}
          />
        </Actions>
      </Form>
    );
  }
}
