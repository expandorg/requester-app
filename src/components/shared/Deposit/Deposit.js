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

    if (txState !== RequestStates.Fetching) {
      const { dialog } = this.state;
      if (!dialog && !user.address) {
        this.setState({ address: true });
      } else {
        this.setState({ dialog: !dialog });
      }
    }
  };

  handleHideAddress = () => {
    const { user } = this.props;
    this.setState({ address: false });
    if (user.address) {
      this.handleToggle();
    }
  };

  render() {
    const { user, children } = this.props;
    const { dialog, address } = this.state;
    return (
      <>
        {children({ onToggleDepsoit: this.handleToggle })}
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
