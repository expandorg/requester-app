import React, { Component } from 'react';

import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Page from '../shared/Page';

// import styles from './Api.module.styl';

export default class Api extends Component {
  render() {
    return (
      <Page title="API">
        <Navbar title="API" />
        <Sidebar />
      </Page>
    );
  }
}
