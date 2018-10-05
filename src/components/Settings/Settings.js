import React, { Component } from 'react';

import Content from '../shared/Content';

import styles from './Settings.module.styl';

export default class Settings extends Component {
  render() {
    return (
      <Content title="Settings">
        <div className={styles.container}>Settings</div>
      </Content>
    );
  }
}
