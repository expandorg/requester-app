import React, { Component } from 'react';

import Content from '../shared/Content';
import Header from '../shared/Header';

export default class Task extends Component {
  render() {
    return (
      <Content title="Task">
        <Header title="Task" />
      </Content>
    );
  }
}
