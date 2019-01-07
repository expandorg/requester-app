import React, { Component } from 'react';

import { userProps } from '@gemsorg/app-auth';

import WithdrawDialog from './WithdrawDialog';
import AccountConfirmed from '../AccountConfirmed';

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
