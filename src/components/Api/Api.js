import React, { Component } from 'react';

import Content from '../shared/Content';

import styles from './Api.module.styl';

export default class Api extends Component {
  render() {
    return (
      <Content title="Api">
        <div className={styles.container}>Api</div>
      </Content>
    );
  }
}
