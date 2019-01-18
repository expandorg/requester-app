import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import ConfirmEmailForm from './ConfirmEmailForm';
import SuccessForm from '../SuccessForm';

import { ConfirmEmailEffect } from './stateEffects';

export default class ConfirmEmailDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  state = {
    complete: false,
  };

  handleComplete = () => {
    this.setState({ complete: true });
  };

  render() {
    const { onHide } = this.props;
    const { complete } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        contentLabel="confirm-email-dialog"
        hideButton
      >
        {!complete && <ConfirmEmailForm {...this.props} />}
        {complete && (
          <SuccessForm
            onHide={onHide}
            title="Success! Email address updated!"
          />
        )}
        <ConfirmEmailEffect onComplete={this.handleComplete} />
      </Dialog>
    );
  }
}
