import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  RequestStates,
  requestStateProps,
  submitStateEffect,
} from '@expandorg/app-utils';

import { userProps } from '@expandorg/app-auth';
import {
  userBalance,
  WITHDRAW_MAX,
  WITHDRAW_MIN,
} from '@expandorg/app-gemtokens';
import { withdrawPayments } from '@expandorg/app-gemtokens/sagas';

import { withdrawStateSelector } from '@expandorg/app-gemtokens/selectors';

import Button from '../../common/Button';
import Input from '../../common/Input';
import ErrorMessage from '../../common/ErrorMessage';

import { ReactComponent as Card } from '../../assets/creditcard.svg';

import styles from '../serviceForms.module.styl';
import fstyles from './form.module.styl';

export const WithdrawEffect = submitStateEffect(withdrawStateSelector);

const mapStateToProps = state => ({
  submitState: withdrawStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ withdrawPayments }, dispatch);

class WithdrawForm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    submitState: requestStateProps.isRequired,
    onHide: PropTypes.func.isRequired,
    withdrawPayments: PropTypes.func.isRequired,
  };

  constructor(props, ctx) {
    super(props, ctx);

    this.state = {
      amount: `${Math.min(userBalance.get(props.user), WITHDRAW_MAX)}`,
      errors: null,
    };
  }

  handleInputChange = ({ target }) => {
    this.setState({ amount: target.value, errors: null });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { submitState, user } = this.props;
    const { amount } = this.state;

    if (submitState.state !== RequestStates.Fetching) {
      if (!userBalance.canWithdraw(user, +amount)) {
        this.setState({
          errors: {
            commonMessage: `Amount of XPN to withdraw should be between ${WITHDRAW_MIN} and ${WITHDRAW_MAX}`,
          },
        });
      } else {
        this.props.withdrawPayments(user, +amount);
      }
    }
  };

  handleWithdrawFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  render() {
    const { onHide, submitState, user } = this.props;
    const { amount, errors } = this.state;

    const balance = userBalance.get(user);

    const available = userBalance.canWithdraw(user, balance);
    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <form className={styles.inner} onSubmit={this.handleSubmit}>
          <div className={fstyles.icon}>
            <Card width={72} height={64} viewBox="0 0 72 56" />
          </div>
          <div className={styles.title}>Withdaw XPN</div>
          <div className={styles.description}>
            <p className={fstyles.p}>
              Due to high demand, we require a minimum withdrawal of
              <span className={styles.gems}>{WITHDRAW_MIN}</span>tokens. The
              maximum amount of tokens available for withdrawal is
              <span className={styles.gems}>{WITHDRAW_MAX}</span>tokens.
            </p>
            {!available && (
              <p className={fstyles.p}>
                You don&#39;t have enough XPN to withdraw. You current balance
                is<span className={styles.gems}>{balance}</span>tokens.
              </p>
            )}
          </div>
          <div className={styles.field}>
            <Input
              placeholder="Amount of XPN to withdraw"
              type="number"
              value={amount}
              onChange={this.handleInputChange}
            />
            <ErrorMessage errors={errors} className={fstyles.error} />
          </div>
          <div className={styles.actions}>
            <Button
              className={styles.button}
              type="submit"
              disabled={!available}
            >
              {isFetching ? 'Withdrawing' : 'Withdraw'}
            </Button>
            <Button className={styles.button} theme="grey" onClick={onHide}>
              go back
            </Button>
          </div>
        </form>
        <WithdrawEffect onFailed={this.handleWithdrawFailed} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithdrawForm);
