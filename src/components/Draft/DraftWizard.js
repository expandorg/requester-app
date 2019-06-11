import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../shared/Navbar';

import Page from '../shared/Page';

import { draftProps } from '../shared/propTypes';

import { Navigation, NavItem } from './Wizard/Navigation';
import { LoadIndicator } from './Wizard/Form';

// import Settings from './Wizard/Settings/SettingsContainer';
import Data from './Wizard/Data/Data';
import JobForms from './Wizard/JobForms/JobForms';
import CreateTask from './Wizard/Task/CreateTask';
import Payments from './Wizard/Payments/Payments';

import Summary from './Wizard/Summary/Summary';

import { getNavState, WizardSteps } from './wizard';

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

  handleStep = active => {
    this.setState({ active });
  };

  render() {
    const { draft, isLoading } = this.props;
    const { active } = this.state;

    const nav = getNavState(draft);
    const title = (draft && draft.name) || '';

    return (
      <Page
        title={title}
        className={styles.content}
        sidebar={false}
        navbar={false}
        footer={false}
      >
        <Navbar
          title={title}
          top={false}
          logout={false}
          className={styles.navbar}
          theme="dark"
        >
          <Navigation onChange={this.handleChangeActive} active={active}>
            <NavItem {...nav.settings}>Create Job</NavItem>
            <NavItem {...nav.data}>Data</NavItem>
            <NavItem {...nav.forms}>Create Job</NavItem>
            <NavItem {...nav.pay}>Pay</NavItem>
          </Navigation>
        </Navbar>
        <LoadIndicator isLoading={isLoading}>
          {draft && (
            <>
              {/* <Settings draft={draft} onNext={this.handleNext} /> */}
              {active === WizardSteps.Settings && (
                <JobForms draft={draft} onNext={this.handleNext} />
              )}
              {active === WizardSteps.Data && (
                <Data
                  draft={draft}
                  onNext={this.handleNext}
                  onBack={this.handleBack}
                />
              )}
              {active === WizardSteps.Forms && (
                <CreateTask
                  draft={draft}
                  onNext={this.handleNext}
                  onBack={this.handleBack}
                />
              )}
              {active === WizardSteps.Pay && (
                <Payments
                  draft={draft}
                  onNext={this.handleNext}
                  onBack={this.handleBack}
                />
              )}
              {active === WizardSteps.Summary && (
                <Summary
                  draft={draft}
                  onBack={this.handleBack}
                  onStep={this.handleStep}
                />
              )}
            </>
          )}
        </LoadIndicator>
      </Page>
    );
  }
}
