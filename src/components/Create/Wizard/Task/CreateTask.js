import React, { Component } from 'react';
import PropTypes from 'prop-types';
import immer from 'immer';

import Button from '../../../common/Button';
import { Form, Actions, Description } from '../Form';

import FormEditorDialog from '../../../shared/FormEditor/FormEditorDialog';

import StepsForm from './Steps/StepsForm';

import styles from './CreateTask.module.styl';

export default class CreateTask extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
    steps: [
      {
        id: 0,
        name: 'Task',
        checked: true,
        modules: [
          {
            name: 'collapsable=1',
            type: 'collapsable',
            header: 'asd',
            modules: [{ name: 't-1', type: 'email', placeholder: 'email' }],
          },
        ],
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

  handleSaveTemplate = form => {
    const { steps, selected } = this.state;

    this.setState({
      selected: null,
      steps: immer(steps, draft => {
        draft[selected] = {
          ...form,
          checked: true,
        };
      }),
    });
  };

  handleUpdateSteps = steps => {
    this.setState({ steps });
  };

  handleSelectStep = id => {
    const { steps } = this.state;

    const selected = steps.findIndex(s => s.id === id);
    this.setState({ selected });
  };

  handleHideEditor = () => this.setState({ selected: null });

  render() {
    const { selected, steps } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className={styles.container}>
          <div className={styles.inner}>
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
              onUpdate={this.handleUpdateSteps}
              onSelect={this.handleSelectStep}
            />
          </div>
        </div>
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Actions>
        {selected !== null && (
          <FormEditorDialog
            form={steps[selected]}
            onHide={this.handleHideEditor}
            onSave={this.handleSaveTemplate}
          />
        )}
      </Form>
    );
  }
}
