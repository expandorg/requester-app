import React, { Component } from 'react';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

export default class Task extends Component {
  render() {
    return (
      <Content title="Task">
        <Navbar title="Task" />
        <Sidebar />
      </Content>
    );
  }
}
