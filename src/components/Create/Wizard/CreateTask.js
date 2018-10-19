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
    selected: 0,
    add: false,
    steps: [
      {
        id: 0,
        name: 'Task',
        checked: true,
        modules: [],
      },
    ],
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

  handleAddStep = template => {
    this.setState(({ steps }) => ({
      steps: [...steps, template],
      add: false,
    }));
  };

  handleSelectStep = id => {
    const { steps } = this.state;

    const selected = steps.findIndex(s => s.id === id);
    this.setState({ selected });
  };

  handleHideEditor = () => this.setState({ selected: null });

  render() {
    const { selected, add, steps } = this.state;
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
            steps={steps}
            onAdd={this.handleToggleTemplates}
            onSelect={this.handleSelectStep}
          />
        </div>
        <Actions>
          <Button onClick={this.handleBack}>Back</Button>
          <Button>Next</Button>
        </Actions>
        {selected !== null && (
          <FormEditorDialog
            form={steps[selected]}
            onHide={this.handleHideEditor}
          />
        )}
        {add && (
          <TemplatesDialog
            title="Onboarding"
            templates={mocks}
            description="Pick onboarding step template"
            onHide={this.handleToggleTemplates}
            onSelect={this.handleAddStep}
          />
        )}
      </Form>
    );
  }
}
