import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Description, Actions } from './Form';
import Button from '../../common/Button';

import TemplatesForm from '../../shared/Templates/Templates';

import mocks from '../../shared/Templates/template-mocks';

import styles from './Templates.module.styl';

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
            templates={mocks}
            selected={templateId}
            onSelect={this.handleSelect}
          />
        </div>
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
          <Button>Next</Button>
        </Actions>
      </Form>
    );
  }
}
