import React, { Component } from 'react';

import Content from '../shared/Content';
import Header from '../shared/Header';

import { Navigation, NavItem } from './Wizard/Navigation';

import Settings from './Wizard/Settings';

import styles from './Create.module.styl';

export default class Create extends Component {
  render() {
    return (
      <Content title="Create">
        <Header title="Create">
          <Navigation>
            <NavItem active done>
              Settings
            </NavItem>
            <NavItem>Upload</NavItem>
            <NavItem>Templates</NavItem>
            <NavItem>Create Task</NavItem>
            <NavItem>Whitelist</NavItem>
            <NavItem>Pay</NavItem>
          </Navigation>
        </Header>
        <div className={styles.container}>
          <Settings />
        </div>
      </Content>
    );
  }
}
