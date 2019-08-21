import React from 'react';

import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import ApiKeyForm from './ApiKeyForm';

import styles from './Api.module.styl';

function Api() {
  return (
    <Page title="API">
      <Navbar title="API" />
      <Sidebar />
      <div className={styles.container}>
        <ApiKeyForm />
      </div>
    </Page>
  );
}

export default authenticated(Api);
