import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Actions, Section, Form, Description, HeroWarning } from '../Form';

import Button from '../../../common/Button';

import { ReactComponent as Warning } from '../../../assets/warning.svg';

import Settings from './Settings';
import Data from './Data';
import Task from './Task';
import Whitelist from './Whitelist';
import Payout from './Payout';
import MenuButton from './Publish/MenuButton';

import styles from './Summary.module.styl';

export default class Summary extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleSubmit = evt => {
    evt.preventDefault();
  };

  handleScheduleClick = () => {};

  handlePublishClick = () => {};

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <Description className={styles.description}>
          Description about this step goes here.
        </Description>
        <Section title="Settings" status="complete" blue>
          <Settings />
        </Section>
        <Section title="Data" status="required">
          <Data />
        </Section>
        <Section title="Task" blue>
          <Task />
        </Section>
        <Section title="Whitelist">
          <Whitelist />
        </Section>
        <Section title="Payout" blue>
          <Payout />
        </Section>
        <Section>
          <HeroWarning
            icon={<Warning width="64px" height="64px" viewBox="0 0 42 42" />}
          >
            There are still some sections that need completing.
            <br />
            The task can not be published until all sections are complete.
          </HeroWarning>
        </Section>
        <Actions className={styles.actions}>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <MenuButton
            onPublish={this.handlePublishClick}
            onSchedule={this.handleScheduleClick}
          />
        </Actions>
      </Form>
    );
  }
}
