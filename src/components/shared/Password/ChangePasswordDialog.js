import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import PasswordForm, { ChangePasswordEffect } from './ChangePasswordForm';
import SuccessForm from '../SuccessForm';

export default class ChangePasswordDialog extends Component {
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
        contentLabel="edit-password-dialog"
        hideButton
      >
        {!complete && <PasswordForm {...this.props} />}
        {complete && (
          <SuccessForm
            onHide={onHide}
            title="Success! Password has been changed!"
          />
        )}
        <ChangePasswordEffect onComplete={this.handleComplete} />
      </Dialog>
    );
  }
}
