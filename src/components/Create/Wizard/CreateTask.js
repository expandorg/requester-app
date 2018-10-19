import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/Button';
import { Form, Actions, Description } from './Form';

import FormEditorDialog from '../../shared/FormEditor/FormEditorDialog';
import TemplatesDialog from '../../shared/Templates/TemplatesDialog';

import StepsForm from '../../shared/Steps/StepsForm';

import mocks from './template-mocks';

import styles from './CreateTask.module.styl';

export default class CreateTask extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
    add: false,
    forms: [],
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handlePreview = evt => {
    evt.preventDefault();
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleToggleTemplates = () => {
    this.setState(({ add }) => ({ add: !add }));
  };

  onSelect = index => {
    this.setState({ selected: index });
  };

  handleHideEditor = () => this.setState({ selected: null });

  render() {
    const { selected, add, forms } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Button
              className={styles.preview}
              theme="aqua"
              onClick={this.handlePreview}
            >
              Preview
            </Button>
            <Description className={styles.desc}>
              Description about this step goes here.
            </Description>
          </div>
          <StepsForm
            className={styles.steps}
            onAdd={this.handleToggleTemplates}
          />
        </div>
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
          <Button>Next</Button>
        </Actions>
        {selected !== null && (
          <FormEditorDialog
            form={forms[selected]}
            onHide={this.handleHideEditor}
          />
        )}
        {add && (
          <TemplatesDialog
            title="Onboarding"
            templates={mocks}
            description="Pick onboarding step template"
            onHide={this.handleToggleTemplates}
          />
        )}
      </Form>
    );
  }
}
