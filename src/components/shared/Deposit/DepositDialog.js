import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import Button from '../../common/Button';
import Input from '../../common/Input';

import { ReactComponent as Card } from '../../assets/creditcard.svg';

import styles from './DepositDialog.module.styl';

export default class DepositDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  state = {
    amount: '',
  };

  handleHide = evt => {
    const { onHide } = this.props;
    onHide();
    evt.preventDefault();
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
      <Dialog
        visible
        onHide={onHide}
        overlayClass={styles.overlay}
        modalClass={styles.modal}
        contentLabel="depoist-dialog"
        hideButton
      >
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
            <Button
              className={styles.button}
              theme="grey"
              onClick={this.handleHide}
            >
              go back
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
