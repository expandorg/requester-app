import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps } from '@expandorg/app-auth';

import { fetchBalanceStateSelector } from '@expandorg/app-gemtokens/selectors';
import { fetchGemsBalance } from '@expandorg/app-gemtokens/sagas';

import DepositDialog from './DepositDialog';
import AccountConfirmed from '../AccountConfirmed';

const mapStateToProps = state => ({
  fetchState: fetchBalanceStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchGemsBalance }, dispatch);

class Deposit extends Component {
  static propTypes = {
    user: userProps.isRequired,
    fetchGemsBalance: PropTypes.func.isRequired,
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

  render() {
    const { user, children } = this.props;

    return (
      <AccountConfirmed user={user}>
        {({ onToggle, dialog }) => (
          <>
            {children({ onToggleDepsoit: onToggle })}
            {dialog && <DepositDialog user={user} onHide={onToggle} />}
          </>
        )}
      </AccountConfirmed>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deposit);
