import React, { Component } from 'react';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

// import styles from './Profile.module.styl';

export default class Profile extends Component {
  render() {
    return (
      <Content title="Profile">
        <Navbar title="Profile" />
        <Sidebar />
      </Content>
    );
  }
}
