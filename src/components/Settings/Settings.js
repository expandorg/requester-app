import React, { Component } from 'react';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

// import styles from './Settings.module.styl';

export default class Settings extends Component {
  render() {
    return (
      <Content title="Settings">
        <Navbar title="Settings" />
        <Sidebar />
      </Content>
    );
  }
}
