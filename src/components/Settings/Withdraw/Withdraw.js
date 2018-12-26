import React, { Component } from 'react';

import Button from '../../common/Button';

import styles from './Withdraw.module.styl';

export default class Withdraw extends Component {
  state = {
    dialog: false,
  };

  handleToggle = () => {
    this.setState(({ dialog }) => ({ dialog: !dialog }));
  };

  render() {
    const { dialog } = this.state;
    return (
      <>
        <Button className={styles.moneyBtn} onClick={this.handleToggle}>
          Deposit
        </Button>

        {dialog}
      </>
    );
  }
}
