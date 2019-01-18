import React, { Component } from 'react';

import { userProps } from '@expandorg/app-auth';

import { AccountConfirmed } from '@expandorg/app-account/components';

import WithdrawDialog from './WithdrawDialog';

export default class Withdraw extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  render() {
    const { user, children } = this.props;
    return (
      <AccountConfirmed user={user}>
        {({ onToggle, dialog }) => (
          <>
            {children({ onToggleWithdraw: onToggle })}
            {dialog && <WithdrawDialog user={user} onHide={onToggle} />}
          </>
        )}
      </AccountConfirmed>
    );
  }
}
