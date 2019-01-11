import React, { Component } from 'react';

import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

import MetamaskLogin from './metamask/MetamaskLogin';
import EmailLogin from './email/EmailLogin';

import { notAuthenticated } from '../shared/auth';

import styles from './styles.module.styl';

class Login extends Component {
  render() {
    return (
      <DocumentTitle title="Login">
        <div className={styles.container}>
          <div className={styles.panel}>
            <div className={styles.content}>
              <div className={styles.header}>
                <Logo width={100} height={100} viewBox="0 0 50 50" />
                <h2 className={styles.title}>Expand</h2>
              </div>
              <div className={styles.inner}>
                <MetamaskLogin />
                <EmailLogin />
              </div>
              <div className={styles.toggle}>
                Don&apos;t have an account yet?
                <Link to="/signup" className={styles.link}>
                  Sign up here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default notAuthenticated(Login);
