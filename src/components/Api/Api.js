import React, { Component } from 'react';

import { Panel } from '@expandorg/components';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import ApiKeyForm from './ApiKeyForm';

import styles from './Api.module.styl';

class Api extends Component {
  render() {
    return (
      <Page title="API">
        <Navbar title="API" />
        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.panel}>
            <ApiKeyForm />
          </Panel>
        </div>
      </Page>
    );
  }
}

export default authenticated(Api);
