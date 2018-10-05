import React, { Component } from 'react';

import Content from '../shared/Content';

import styles from './Profile.module.styl';

export default class Profile extends Component {
  render() {
    return (
      <Content title="Profile">
        <div className={styles.container}>Profile</div>
      </Content>
    );
  }
}
