import React, { Component } from 'react';

import { userProps } from '@expandorg/app-auth';
import Button from '../common/Button';

import Hero from '../shared/Hero';
import Deposit from '../shared/Deposit/Deposit';
import Withdraw from '../shared/Withdraw/Withdraw';

import Form from './Form';

import styles from './Gems.module.styl';

export default class Gems extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { user } = this.props;
    return (
      <Form>
        <Hero
          className={styles.hero}
          value={user.gems.balance}
          title="XPN available"
        />
        <div className={styles.actions}>
          <Deposit user={user}>
            {({ onToggleDepsoit }) => (
              <Button className={styles.deposit} onClick={onToggleDepsoit}>
                Deposit
              </Button>
            )}
          </Deposit>
          <Withdraw user={user}>
            {({ onToggleWithdraw }) => (
              <Button
                theme="secondary"
                className={styles.withdraw}
                onClick={onToggleWithdraw}
              >
                Withdraw
              </Button>
            )}
          </Withdraw>
        </div>
      </Form>
    );
  }
}
