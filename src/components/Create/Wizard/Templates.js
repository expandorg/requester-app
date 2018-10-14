import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Description, Actions, ActionBtn } from './Form';

import TemplatesForm from '../../shared/Templates/Templates';

import styles from './Templates.module.styl';

const stubs = [
  {
    id: 0,
    name: 'Template name very very long',
    logo: 'https://portal.gems.org//images/complete-tasks.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 1,
    name: 'Template name',
    logo: 'https://portal.gems.org//images/complete-tasks.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 2,
    name: 'Template name',
    logo: 'https://portal.gems.org//images/complete-tasks.png',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

export default class Templates extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    templateId: null,
  };

  handleSelect = templateId => {
    this.setState({ templateId });
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleToggleApi = evt => {
    evt.preventDefault();
  };

  render() {
    const { templateId } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.container}>
          <Description>Description about this step goes here.</Description>
          <TemplatesForm
            className={styles.templates}
            title="Templates"
            description="Select task template"
            templates={stubs}
            selected={templateId}
            onSelect={this.handleSelect}
          />
        </div>
        <Actions>
          <ActionBtn onClick={this.handleBack}>Back</ActionBtn>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
