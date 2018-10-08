import React, { Component } from 'react';

import Content from '../shared/Content';
import Header from '../shared/Header';

// import styles from './Settings.module.styl';

export default class Settings extends Component {
  render() {
    return (
      <Content title="Settings">
        <Header title="Settings" />
      </Content>
    );
  }
}
