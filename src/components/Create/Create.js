import React, { Component } from 'react';

import Content from '../shared/Content';
import Header from '../shared/Header';

import { Navigation, NavItem } from './Wizard/Navigation';

import Settings from './Wizard/Settings';

import styles from './Create.module.styl';

export default class Create extends Component {
  state = {
    active: 0,
  };

  handleChangeActive = active => {
    this.setState({ active });
  };

  render() {
    const { active } = this.state;
    return (
      <Content title="Create">
        <Header title="Create">
          <Navigation onChange={this.handleChangeActive} active={active}>
            <NavItem done>Settings</NavItem>
            <NavItem>Upload</NavItem>
            <NavItem>Templates</NavItem>
            <NavItem>Create Task</NavItem>
            <NavItem>Whitelist</NavItem>
            <NavItem>Pay</NavItem>
          </Navigation>
        </Header>
        <div className={styles.container}>{active === 0 && <Settings />}</div>
      </Content>
    );
  }
}
