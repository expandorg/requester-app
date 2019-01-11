import React, { Component } from 'react';

import DocumentTitle from 'react-document-title';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../assets/logo.svg';

import MetamaskSignup from './metamask/MetamaskSignup';
import EmailSignup from './email/EmailSignup';

import { notAuthenticated } from '../shared/auth';

import styles from './styles.module.styl';

class Signup extends Component {
  render() {
    return (
      <DocumentTitle title="Signup">
        <div className={styles.container}>
          <div className={styles.panel}>
            <div className={styles.content}>
              <div className={styles.header}>
                <Logo width={100} height={100} viewBox="0 0 50 50" />
                <h2 className={styles.title}>Expand</h2>
              </div>
              <div className={styles.inner}>
                <MetamaskSignup />
                <EmailSignup />
              </div>
              <div className={styles.toggle}>
                Already have an account?
                <Link to="/login" className={styles.link}>
                  Sign in here.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default notAuthenticated(Signup);
