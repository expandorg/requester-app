import React, { Component } from 'react';

import DocumentTitle from 'react-document-title';
import { historyProps } from '@gemsorg/app-utils';

import { ReactComponent as Logo } from '../assets/logo.svg';

import MetamaskSignup from './metamask/MetamaskSignup';
import EmailSignup from './email/EmailSignup';

import { notAuthenticated } from '../shared/auth';

import styles from './styles.module.styl';

class Signup extends Component {
  static propTypes = {
    history: historyProps.isRequired,
  };

  handleRedirect = () => {
    const { history } = this.props;
    history.push('/login');
  };

  render() {
    return (
      <DocumentTitle title="Signup">
        <div className={styles.container}>
          <div className={styles.panel}>
            <div className={styles.content}>
              <div className={styles.header}>
                <Logo width={100} height={100} viewBox="0 0 50 50" />
                <h2 className={styles.title}>Gems</h2>
              </div>
              <div className={styles.inner}>
                <MetamaskSignup />
                <EmailSignup onToggle={this.handleRedirect} />
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default notAuthenticated(Signup);
