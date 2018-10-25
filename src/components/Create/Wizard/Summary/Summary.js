import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Actions, Section, Form, Description } from '../Form';
import Button from '../../../common/Button';

import Settings from './Settings';
import Data from './Data';
import Task from './Task';
import Whitelist from './Whitelist';
import Payout from './Payout';

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

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.form}>
        <Description className={styles.description}>
          Description about this step goes here.
        </Description>
        <Section title="Settings" confirmed blue>
          <Settings />
        </Section>
        <Section title="Data" confirmed>
          <Data />
        </Section>
        <Section title="Task" confirmed blue>
          <Task />
        </Section>
        <Section title="Whitelist" confirmed>
          <Whitelist />
        </Section>
        <Section title="Payout" confirmed blue>
          <Payout />
        </Section>
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
        </Actions>
      </Form>
    );
  }
}
