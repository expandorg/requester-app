import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';
import { MetamaskState } from '@expandorg/app-web3';

import Install from './Install';
import Unlock from './Unlock';
import Form from './Form';

import styles from './MetamaskPromt.module.styl';

export default class MetamaskPromt extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    action: PropTypes.string,
    headline: PropTypes.string,
    description: PropTypes.string,
    error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onLogin: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    action: 'Sign in',
    error: null,
    headline: 'You’ll need to sign in using MetaMask',
    description: '(similar to the above). Click below to log in.',
  };

  render() {
    const {
      metamaskState,
      onLogin,
      onHide,
      action,
      error,
      headline,
      description,
    } = this.props;
    return (
      <Dialog onHide={onHide} hideButton visible contentLabel="matamask">
        <div className={styles.container}>
          {metamaskState === MetamaskState.NotInstalled && (
            <Install onHide={onHide} />
          )}
          {metamaskState === MetamaskState.NotAuthorized && (
            <Unlock onHide={onHide} />
          )}
          {metamaskState === MetamaskState.Authorized && (
            <Form
              onAction={onLogin}
              description={description}
              headline={headline}
              action={action}
              error={error}
            />
          )}
        </div>
      </Dialog>
    );
  }
}
