import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userProps } from '@expandorg/app-auth';
import { logout } from '@expandorg/app-auth/sagas';
import { userSelector } from '@expandorg/app-auth/selectors';

import {
  AddressDialog,
  EditEmailDialog,
  ChangePasswordDialog,
} from '@expandorg/app-account/components';

import { Panel, Button } from '@expandorg/components';

import { Navbar } from '@expandorg/components/app';

import Sidebar from '../shared/Sidebar';

import Page from '../shared/Page';

import { authenticated } from '../shared/auth';

import ToggleEmailConfirm from './ToggleEmailConfirm';

import Field from './Field';
import XPN from './XPN';

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
      <Page title="Settings">
        <Navbar title="Settings" />
        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.panel}>
            <XPN user={user} />
          </Panel>
          <Panel className={styles.panel}>
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
              <Button
                className={styles.logout}
                theme="white-blue"
                onClick={this.handleLogoutClick}
              >
                Logout
              </Button>
            </div>
          </Panel>
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
      </Page>
    );
  }
}

export default authenticated(
  connect(mapStateToProps, mapDispatchToProps)(Settings)
);
