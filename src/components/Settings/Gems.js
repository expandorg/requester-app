import React, { Component } from 'react';

import { userProps } from '@gemsorg/app-auth';
import Button from '../common/Button';

import Hero from '../shared/Hero';
import Deposit from '../shared/Deposit/Deposit';

import Form from './Form';

import styles from './Gems.module.styl';

export default class Gems extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  handleWithdrawClick = () => {};

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
          title="Gems available"
        />
        <div className={styles.actions}>
          <Deposit user={user}>
            {({ onToggleDepsoit }) => (
              <Button className={styles.deposit} onClick={onToggleDepsoit}>
                Deposit
              </Button>
            )}
          </Deposit>
          <Button
            theme="secondary"
            className={styles.withdraw}
            onClick={this.handleWithdrawClick}
          >
            Withdraw
          </Button>
        </div>
      </Form>
    );
  }
}
