import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import { draftProps } from '../shared/propTypes';

import { Navigation, NavItem } from './Wizard/Navigation';
import { LoadIndicator } from './Wizard/Form';

import Settings from './Wizard/Settings/SettingsContainer';
import Data from './Wizard/Data/Data';
import Templates from './Wizard/Templates/Templates';
import CreateTask from './Wizard/Task/CreateTask';
// import Whitelist from './Wizard/Whitelist/Whitelist';
import Payments from './Wizard/Payments/Payments';

import Summary from './Wizard/Summary/Summary';

import { getNavState } from './wizard';

import styles from './DraftWizard.module.styl';

export default class DraftWizard extends Component {
  static propTypes = {
    draft: draftProps,
    tab: PropTypes.number,
    isLoading: PropTypes.bool,
  };

  static defaultProps = {
    tab: 0,
    draft: null,
    isLoading: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      active: props.tab,
    };
  }

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
    const { draft, isLoading } = this.props;
    const { active } = this.state;

    const nav = getNavState(draft);

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
              <NavItem {...nav.settings}>Settings</NavItem>
              <NavItem {...nav.upload}>Upload</NavItem>
              <NavItem {...nav.templates}>Templates</NavItem>
              <NavItem {...nav.task}>Create Task</NavItem>
              {/* <NavItem {...nav.whitelist}>Whitelist</NavItem> */}
              <NavItem {...nav.pay}>Pay</NavItem>
            </Navigation>
          </Navbar>
          <LoadIndicator isLoading={isLoading}>
            {draft && (
              <div className={styles.container}>
                {active === 0 && (
                  <Settings draft={draft} onNext={this.handleNext} />
                )}
                {active === 1 && (
                  <Data
                    draft={draft}
                    onNext={this.handleNext}
                    onBack={this.handleBack}
                  />
                )}
                {active === 2 && (
                  <Templates
                    draft={draft}
                    onNext={this.handleNext}
                    onBack={this.handleBack}
                  />
                )}
                {active === 3 && (
                  <CreateTask
                    draft={draft}
                    onNext={this.handleNext}
                    onBack={this.handleBack}
                  />
                )}
                {/* {active === 4 && (
                  <Whitelist
                    draft={draft}
                    onNext={this.handleNext}
                    onBack={this.handleBack}
                  />
                )} */}
                {active === 4 && (
                  <Payments
                    draft={draft}
                    onNext={this.handleNext}
                    onBack={this.handleBack}
                  />
                )}
                {active === 5 && (
                  <Summary draft={draft} onBack={this.handleBack} />
                )}
              </div>
            )}
          </LoadIndicator>
        </Content>
      </DragDropContextProvider>
    );
  }
}
