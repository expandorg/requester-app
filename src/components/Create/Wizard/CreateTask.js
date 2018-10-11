import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Actions, ActionBtn } from './Form';

import FormEditorDialog from '../../shared/FormEditor/FormEditorDialog';

export default class CreateTask extends Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
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

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Actions>
          <FormEditorDialog onHide={this.handleBack} />
          <ActionBtn onClick={this.handleBack}>Back</ActionBtn>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
