import React, { Component } from 'react';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';

import { Navigation, NavItem } from './Wizard/Navigation';

import Settings from './Wizard/Settings';
import Data from './Wizard/Data/Data';
import Templates from './Wizard/Templates';
import CreateTask from './Wizard/Task/CreateTask';
import Whitelist from './Wizard/Whitelist/Whitelist';
import Payments from './Wizard/Payments/Payments';

import Summary from './Wizard/Summary/Summary';

import styles from './DraftWizard.module.styl';

export default class DraftWizard extends Component {
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
      <DragDropContextProvider backend={HTML5Backend}>
        <Content
          title="Create a task"
          className={styles.content}
          sidebar={false}
          navbar={false}
        >
          <Navbar title="Create a task" top={false}>
            <Navigation onChange={this.handleChangeActive} active={active}>
              <NavItem status="complete">Settings</NavItem>
              <NavItem status="required">Upload</NavItem>
              <NavItem>Templates</NavItem>
              <NavItem>Create Task</NavItem>
              <NavItem>Whitelist</NavItem>
              <NavItem>Pay</NavItem>
            </Navigation>
          </Navbar>
          <div className={styles.container}>
            {active === 0 && <Settings onNext={this.handleNext} />}
            {active === 1 && (
              <Data onNext={this.handleNext} onBack={this.handleBack} />
            )}
            {active === 2 && (
              <Templates onNext={this.handleNext} onBack={this.handleBack} />
            )}
            {active === 3 && (
              <CreateTask onNext={this.handleNext} onBack={this.handleBack} />
            )}
            {active === 4 && (
              <Whitelist onNext={this.handleNext} onBack={this.handleBack} />
            )}
            {active === 5 && (
              <Payments onNext={this.handleNext} onBack={this.handleBack} />
            )}
            {active === 6 && <Summary onBack={this.handleBack} />}
          </div>
        </Content>
      </DragDropContextProvider>
    );
  }
}
