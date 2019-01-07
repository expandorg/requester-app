import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps } from '@gemsorg/app-auth';
import { logout } from '@gemsorg/app-auth/sagas';
import { userSelector } from '@gemsorg/app-auth/selectors';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import { authenticated } from '../shared/auth';

import AddressDialog from '../shared/Address/AddressDialog';
import EditEmailDialog from '../shared/Email/EditEmailDialog';
import ChangePasswordDialog from '../shared/Password/ChangePasswordDialog';

import ToggleEmailConfirm from './ToggleEmailConfirm';
import Field from './Field';
import Form from './Form';
import Gems from './Gems';

import styles from './Settings.module.styl';

const mapStateToProps = state => ({
  user: userSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

class Settings extends Component {
  static propTypes = {
    user: userProps.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    address: false,
    email: false,
    password: false,
  };

  handleLogoutClick = () => {
    this.props.logout();
  };

  handleToggleAddress = () => {
    this.setState(({ address }) => ({ address: !address }));
  };

  handleToggleEmail = () => {
    this.setState(({ email }) => ({ email: !email }));
  };

  handleTogglePassword = () => {
    this.setState(({ password }) => ({ password: !password }));
  };

  render() {
    const { user } = this.props;
    const { address, password, email } = this.state;

    return (
      <Content title="Settings">
        <Navbar title="Settings" />
        <Sidebar />
        <div className={styles.container}>
          <Gems user={user} />
          <Form>
            <div className={styles.title}>Account Details</div>
            <Field
              title="Account address"
              placeholder="No ethereum address found"
              value={user.address}
              onToggle={this.handleToggleAddress}
            />
            <Field
              title="Email address"
              placeholder="No email found"
              value={user.email}
              onToggle={this.handleToggleEmail}
            >
              <ToggleEmailConfirm user={user} />
            </Field>
            <Field
              title="Change password"
              onToggle={this.handleTogglePassword}
            />
            <div className={styles.actions}>
              <button
                className={styles.logout}
                onClick={this.handleLogoutClick}
              >
                Logout
              </button>
            </div>
          </Form>
        </div>
        {address && (
          <AddressDialog user={user} onHide={this.handleToggleAddress} />
        )}
        {email && (
          <EditEmailDialog user={user} onHide={this.handleToggleEmail} />
        )}
        {password && (
          <ChangePasswordDialog
            user={user}
            onHide={this.handleTogglePassword}
          />
        )}
      </Content>
    );
  }
}

export default authenticated(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
);
