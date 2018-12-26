import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import { MetamaskState } from '@gemsorg/app-web3';

import dstyles from '../../common/dialog.module.styl';

import Install from './Install';
import Unlock from './Unlock';
import Form from './Form';

import styles from './MetamaskPromt.module.styl';

const headers = {
  [MetamaskState.NotInstalled]: 'Please Install MetaMask',
  [MetamaskState.NotAuthorized]: 'Please Unlock MetaMask',
  [MetamaskState.Authorized]: 'You’ll need to sign in using MetaMask',
};

export default class MetamaskPromt extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    action: PropTypes.string,
    error: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    action: 'Sign in',
    error: null,
  };

  render() {
    const { metamaskState, onLogin, onHide, action, error } = this.props;
    return (
      <Dialog
        overlayClass={dstyles.overlay}
        modalClass={dstyles.modal}
        onHide={onHide}
        hideButton
        visible
        contentLabel="matamask"
      >
        <div className={styles.container}>
          <div className={styles.headline}>{headers[metamaskState]}</div>
          {metamaskState === MetamaskState.NotInstalled && (
            <Install onHide={onHide} />
          )}
          {metamaskState === MetamaskState.NotAuthorized && (
            <Unlock onHide={onHide} />
          )}
          {metamaskState === MetamaskState.Authorized && (
            <Form onLogin={onLogin} action={action} error={error} />
          )}
        </div>
      </Dialog>
    );
  }
}
