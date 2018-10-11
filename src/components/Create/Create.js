import React, { Component } from 'react';

import Content from '../shared/Content';
import Header from '../shared/Header';

import { Navigation, NavItem } from './Wizard/Navigation';

import Settings from './Wizard/Settings';
import UploadData from './Wizard/UploadData';

import styles from './Create.module.styl';

export default class Create extends Component {
  state = {
    active: 0,
  };

  handleChangeActive = active => {
    this.setState({ active });
  };

  handleNext = () => {
    this.setState(({ active }) => ({ active: active + 1 }));
  };

  handleBack = () => {
    this.setState(({ active }) => ({ active: active - 1 }));
  };

  render() {
    const { active } = this.state;
    return (
      <Content title="Create a task" className={styles.content}>
        <Header title="Create a task" className={styles.header}>
          <Navigation onChange={this.handleChangeActive} active={active}>
            <NavItem done>Settings</NavItem>
            <NavItem>Upload</NavItem>
            <NavItem>Templates</NavItem>
            <NavItem>Create Task</NavItem>
            <NavItem>Whitelist</NavItem>
            <NavItem>Pay</NavItem>
          </Navigation>
        </Header>
        <div className={styles.container}>
          {active === 0 && <Settings onNext={this.handleNext} />}
          {active === 1 && (
            <UploadData onNext={this.handleNext} onBack={this.handleBack} />
          )}
        </div>
      </Content>
    );
  }
}
