import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Description, Fieldset, Actions, ActionBtn } from './Form';

export default class Templates extends Component {
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

  handleToggleApi = evt => {
    evt.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
        </Fieldset>
        <Actions>
          <ActionBtn onClick={this.handleBack}>Back</ActionBtn>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
