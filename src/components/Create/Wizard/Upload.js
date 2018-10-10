import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Description, Actions, ActionBtn } from './Form';

export default class Settings extends Component {
  static propTypes = {
    onNext: PropTypes.func,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    onNext: Function.prototype,
    onBack: Function.prototype,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleCancel = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Description>
          The second step is uploading your data and assigning variables.
        </Description>
        <Actions>
          <ActionBtn onClick={this.handleCancel}>Back</ActionBtn>
          <ActionBtn>Next</ActionBtn>
        </Actions>
      </Form>
    );
  }
}
