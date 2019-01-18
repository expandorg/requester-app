import React, { Component } from 'react';

import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

// import styles from './Profile.module.styl';

class Profile extends Component {
  render() {
    return (
      <Page title="Profile">
        <Navbar title="Profile" />
        <Sidebar />
      </Page>
    );
  }
}

export default authenticated(Profile);
