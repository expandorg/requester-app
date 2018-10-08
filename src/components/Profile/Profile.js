import React, { Component } from 'react';

import Content from '../shared/Content';
import Header from '../shared/Header';

// import styles from './Profile.module.styl';

export default class Profile extends Component {
  render() {
    return (
      <Content title="Profile">
        <Header title="Profile" />
      </Content>
    );
  }
}
