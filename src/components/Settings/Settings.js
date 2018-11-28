import React, { Component } from 'react';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import { authenticated } from '../shared/auth';

import Button from '../common/Button';
import Input from '../common/Input';

import Hero from '../shared/Hero';
import DepositDialog from '../shared/Deposit/DepositDialog';

import styles from './Settings.module.styl';

class Settings extends Component {
  state = {
    email: '',
    address: '',
    password: '',

    deposit: false,
  };

  handleWithdrawClick = () => {};

  handleToggleDeposit = () => {
    this.setState(({ deposit }) => ({ deposit: !deposit }));
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { email, address, password, deposit } = this.state;
    return (
      <Content title="Settings">
        <Navbar title="Settings" />
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.form}>
            <Hero value={200} title="Gems available" className={styles.hero} />
            <div className={styles.actions}>
              <Button
                className={styles.moneyBtn}
                onClick={this.handleToggleDeposit}
              >
                Deposit
              </Button>
              <Button
                theme="secondary"
                className={styles.moneyBtn}
                onClick={this.handleWithdrawClick}
              >
                Withdraw
              </Button>
            </div>
          </div>
          <div className={styles.form}>
            <div className={styles.title}>Account Details</div>
            <div className={styles.field}>
              <Input
                value={address}
                className={styles.input}
                placeholder="Account address"
                name="address"
                onChange={this.handleInputChange}
              />
              <button className={styles.updateBtn}>Update</button>
            </div>
            <div className={styles.field}>
              <Input
                value={email}
                className={styles.input}
                placeholder="Email address"
                name="email"
                onChange={this.handleInputChange}
              />
              <button className={styles.updateBtn}>Update</button>
            </div>
            <div className={styles.field}>
              <Input
                value={password}
                className={styles.input}
                placeholder="New password"
                name="password"
                onChange={this.handleInputChange}
              />
              <button className={styles.updateBtn}>Update</button>
            </div>
          </div>
        </div>
        {deposit && <DepositDialog onHide={this.handleToggleDeposit} />}
      </Content>
    );
  }
}

export default authenticated(Settings);
