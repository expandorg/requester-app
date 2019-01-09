import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Prompt } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  RequestStates,
  requestStateProps,
  submitStateEffect,
} from '@expandorg/app-utils';

import {
  userBalance,
  DEPOSIT_MIN,
  DEPOSIT_MAX,
} from '@expandorg/app-gemtokens';
import { depositGems } from '@expandorg/app-gemtokens/sagas';
import {
  // depositStageSelector,
  depositStateSelector,
  gemBalanceSelector,
} from '@expandorg/app-gemtokens/selectors';

import Button from '../../common/Button';
import Input from '../../common/Input';
import ErrorMessage from '../../common/ErrorMessage';

import { ReactComponent as Card } from '../../assets/creditcard.svg';

import Description from './Description';

import styles from '../serviceForms.module.styl';
import fstyles from './form.module.styl';

export const DepositEffect = submitStateEffect(depositStateSelector);

const message = () =>
  'Please do not navigate away while your deposit is being processed (click cancel).';

const mapStateToProps = state => ({
  // stage: depositStageSelector(state),
  submitState: depositStateSelector(state),
  balance: gemBalanceSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ depositGems }, dispatch);

class DepositForm extends Component {
  static propTypes = {
    balance: PropTypes.number,
    // stage: PropTypes.number.isRequired,
    submitState: requestStateProps.isRequired,
    onHide: PropTypes.func.isRequired,
    depositGems: PropTypes.func.isRequired,
  };

  static defaultProps = {
    balance: 0,
  };

  state = {
    amount: '',
    errors: null,
  };

  handleInputChange = ({ target }) => {
    this.setState({ amount: target.value, errors: null });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { submitState, balance } = this.props;
    const { amount } = this.state;

    if (submitState.state !== RequestStates.Fetching) {
      if (!userBalance.canDeposit(+amount, balance)) {
        this.setState({
          errors: {
            commonMessage: `Amount of XPN to deposit should be between ${DEPOSIT_MIN} and ${DEPOSIT_MAX}`,
          },
        });
      } else {
        this.props.depositGems(+amount);
      }
    }
  };

  handleDepositFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  render() {
    const { onHide, balance, submitState } = this.props;
    const { amount, errors } = this.state;

    const isSubmitting = submitState.state === RequestStates.Fetching;

    const disabled = isSubmitting || Number.isNaN(+amount);

    return (
      <div className={styles.container}>
        <form className={styles.inner} onSubmit={this.handleSubmit}>
          <div className={fstyles.icon}>
            <Card width={72} height={64} viewBox="0 0 72 56" />
          </div>
          <div className={styles.title}>Deposit more XPN.</div>
          <div className={styles.description}>
            <Description balance={balance} />
          </div>
          <div className={styles.field}>
            <Input
              placeholder="Amount of XPN to deposit"
              value={amount}
              onChange={this.handleInputChange}
            />
            <ErrorMessage errors={errors} className={fstyles.error} />
          </div>
          <div className={styles.actions}>
            <Button className={styles.button} type="submit" disabled={disabled}>
              Deposit
            </Button>
            <Button className={styles.button} theme="grey" onClick={onHide}>
              go back
            </Button>
          </div>
        </form>
        <DepositEffect onFailed={this.handleDepositFailed} />
        <Prompt when={isSubmitting} message={message} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepositForm);
