import React, { Component } from 'react';

import { connect } from 'react-redux';

import { userProps } from '@gemsorg/app-auth';
import { userSelector } from '@gemsorg/app-auth/selectors';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import { authenticated } from '../shared/auth';

import Button from '../common/Button';
import Input from '../common/Input';

import Hero from '../shared/Hero';
import Deposit from '../shared/Deposit/Deposit';

import styles from './Settings.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

class Settings extends Component {
  static propTypes = {
    user: userProps.isRequired,
  };

  state = {
    email: '',
    address: '',
    password: '',
  };

  handleWithdrawClick = () => {};

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const { user } = this.props;
    const { email, address, password } = this.state;
    return (
      <Content title="Settings">
        <Navbar title="Settings" />
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.form}>
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
      </Content>
    );
  }
}

export default authenticated(connect(mapStateToProps)(Settings));
