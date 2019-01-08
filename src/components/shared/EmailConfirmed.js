import React, { Component } from 'react';

import { userProps } from '@expandorg/app-auth';

import EditEmailDialog from './Email/EditEmailDialog';
import ConfirmEmailDialog from './Email/ConfirmEmailDialog';

export default class EmailConfirmed extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  state = {
    dialog: false,
    email: false,
    confirm: false,
  };

  handleToggle = () => {
    const { user } = this.props;

    const { dialog } = this.state;
    try {
      if (!dialog) {
        if (!user.email) {
          throw new Error('email');
        }
        if (!user.emailConfirmed) {
          throw new Error('confirm');
        }
      }
      this.setState({ dialog: !dialog });
    } catch (e) {
      this.setState({ [e.message]: true });
    }
  };

  handleHideEmail = () => {
    const { user } = this.props;
    this.setState({ email: false });
    if (user.email) {
      this.handleToggle();
    }
  };

  handleHideConfirm = () => {
    const { user } = this.props;
    this.setState({ confirm: false });
    if (user.emailConfirmed) {
      this.handleToggle();
    }
  };

  render() {
    const { user, children } = this.props;
    const { dialog, email, confirm } = this.state;

    return (
      <>
        {children({ onToggle: this.handleToggle, dialog })}
        {email && <EditEmailDialog user={user} onHide={this.handleHideEmail} />}
        {confirm && (
          <ConfirmEmailDialog user={user} onHide={this.handleHideConfirm} />
        )}
      </>
    );
  }
}
