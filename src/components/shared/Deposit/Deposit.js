import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates } from '@gemsorg/app-utils';
import { userProps } from '@gemsorg/app-auth';

import {
  fetchBalanceStateSelector,
  transactionStateSelector,
} from '@gemsorg/app-gemtokens/selectors';

import { fetchGemsBalance } from '@gemsorg/app-gemtokens/sagas';

import DepositDialog from './DepositDialog';
import AddressDialog from '../Address/AddressDialog';
import ConfirmEmailDialog from '../Email/ConfirmEmailDialog';

const mapStateToProps = state => ({
  fetchState: fetchBalanceStateSelector(state),
  txState: transactionStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance }, dispatch);

class Deposit extends Component {
  static propTypes = {
    user: userProps.isRequired,
    txState: PropTypes.string.isRequired,
    fetchGemsBalance: PropTypes.func.isRequired,
  };

  state = {
    dialog: false,
    confirm: false,
    address: false,
  };

  componentDidMount() {
    const { user } = this.props;
    if (user.address) {
      this.props.fetchGemsBalance(user);
    }
  }

  componentDidUpdate({ user: prevUser }) {
    const { user } = this.props;
    if (user !== prevUser && user.address) {
      this.props.fetchGemsBalance(user);
    }
  }

  handleToggle = () => {
    const { user, txState } = this.props;
    if (txState === RequestStates.Fetching) {
      return;
    }

    const { dialog } = this.state;
    try {
      if (!dialog) {
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
    const { dialog, address, confirm } = this.state;
    return (
      <>
        {children({ onToggleDepsoit: this.handleToggle })}
        {confirm && (
          <ConfirmEmailDialog user={user} onHide={this.handleHideConfirm} />
        )}
        {address && (
          <AddressDialog user={user} onHide={this.handleHideAddress} />
        )}
        {dialog && <DepositDialog user={user} onHide={this.handleToggle} />}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deposit);
