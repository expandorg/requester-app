import React, { Component } from 'react';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

// import styles from './Api.module.styl';

export default class Api extends Component {
  render() {
    return (
      <Content title="API">
        <Navbar title="API" />
        <Sidebar />
      </Content>
    );
  }
}
