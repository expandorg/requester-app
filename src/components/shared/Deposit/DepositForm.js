import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../common/Button';
import Input from '../../common/Input';

import { ReactComponent as Card } from '../../assets/creditcard.svg';

import styles from './DepositForm.module.styl';

export default class DepositForm extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({ amount: target.value });
  };

  handleDeposit = evt => {
    evt.preventDefault();
  };

  render() {
    const { onHide } = this.props;
    const { amount } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.icon}>
          <Card width={72} height={64} viewBox="0 0 72 56" />
        </div>
        <div className={styles.title}>Deposit more gems.</div>
        <div className={styles.description}>
          You have 500 available in your account.
        </div>
        <div className={styles.field}>
          <Input
            placeholder="Amount of gems to deposit"
            value={amount}
            onChange={this.handleInputChange}
          />
        </div>
        <div className={styles.actions}>
          <Button className={styles.button} onClick={this.handleDeposit}>
            Deposit
          </Button>
          <Button className={styles.button} theme="grey" onClick={onHide}>
            go back
          </Button>
        </div>
      </div>
    );
  }
}
