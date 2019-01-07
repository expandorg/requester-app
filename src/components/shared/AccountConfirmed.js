import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { RequestStates } from '@gemsorg/app-utils';
import { userProps } from '@gemsorg/app-auth';

import { transactionStateSelector } from '@gemsorg/app-gemtokens/selectors';

import AddressDialog from './Address/AddressDialog';
import EditEmailDialog from './Email/EditEmailDialog';
import ConfirmEmailDialog from './Email/ConfirmEmailDialog';

const mapStateToProps = state => ({
  txState: transactionStateSelector(state),
});

class AccountConfirmed extends Component {
  static propTypes = {
    user: userProps.isRequired,
    txState: PropTypes.string.isRequired,
  };

  state = {
    dialog: false,
    email: false,
    confirm: false,
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
        if (!user.email) {
          throw new Error('email');
        }
        if (!user.emailConfirmed) {
          throw new Error('confirm');
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

  handleHideEmail = () => {
    const { user } = this.props;
    this.setState({ email: false });
    if (user.email) {
      this.handleToggle();
    }
  };

  handleHideAddress = () => {
    const { user } = this.props;
    this.setState({ address: false });
    if (user.address) {
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
    const { dialog, address, email, confirm } = this.state;

    return (
      <>
        {children({ onToggle: this.handleToggle, dialog })}
        {email && <EditEmailDialog user={user} onHide={this.handleHideEmail} />}
        {confirm && (
          <ConfirmEmailDialog user={user} onHide={this.handleHideConfirm} />
        )}
        {address && (
          <AddressDialog user={user} onHide={this.handleHideAddress} />
        )}
      </>
    );
  }
}

export default connect(mapStateToProps)(AccountConfirmed);
