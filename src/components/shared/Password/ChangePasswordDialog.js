import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';

import PasswordForm, { ChangePasswordEffect } from './ChangePasswordForm';
import SuccessForm from '../SuccessForm';

import dstyles from '../../common/dialog.module.styl';

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
        overlayClass={dstyles.overlay}
        modalClass={dstyles.modal}
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
