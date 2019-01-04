import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { RequestStates } from '@gemsorg/app-utils';
import { userProps } from '@gemsorg/app-auth';

import { transactionStateSelector } from '@gemsorg/app-gemtokens/selectors';

import WithdrawDialog from './WithdrawDialog';
import AddressDialog from '../Address/AddressDialog';
import ConfirmEmailDialog from '../Email/ConfirmEmailDialog';

const mapStateToProps = state => ({
  txState: transactionStateSelector(state),
});

class Withdraw extends Component {
  static propTypes = {
    user: userProps.isRequired,
    txState: PropTypes.string.isRequired,
  };

  state = {
    dialog: false,
    email: false,
    address: false,
  };

  handleToggle = () => {
    const { user, txState } = this.props;
    if (txState === RequestStates.Fetching) {
      return;
    }

    const { dialog } = this.state;
    try {
      if (!dialog) {
        if (!user.emailConfirmed) {
          throw new Error('email');
        }
        if (!user.address) {
          throw new Error('address');
        }
      }
      this.setState({ dialog: !dialog });
    } catch (e) {
      this.setState({ [e.message]: true });
    }
  };

  handleHideAddress = () => {
    const { user } = this.props;
    this.setState({ address: false });
    if (user.address) {
      this.handleToggle();
    }
  };

  handleHideEmail = () => {
    const { user } = this.props;
    this.setState({ email: false });
    if (user.emailConfirmed) {
      this.handleToggle();
    }
  };

  render() {
    const { user, children } = this.props;
    const { dialog, address, email } = this.state;
    return (
      <>
        {children({ onToggleWithdraw: this.handleToggle })}
        {email && (
          <ConfirmEmailDialog user={user} onHide={this.handleHideEmail} />
        )}
        {address && (
          <AddressDialog user={user} onHide={this.handleHideAddress} />
        )}
        {dialog && <WithdrawDialog user={user} onHide={this.handleToggle} />}
      </>
    );
  }
}

export default connect(mapStateToProps)(Withdraw);
