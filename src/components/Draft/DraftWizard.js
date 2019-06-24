import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../shared/Navbar';

import Page from '../shared/Page';

import { draftProps } from '../shared/propTypes';

import { Navigation, NavItem } from './Navigation';
import LoadIndicator from '../shared/LoadIndicator';

import Settings from './Settings/SettingsContainer';
import Data from './Data/Data';
import JobForms from './JobForms/JobForms';
import Payments from './Payments/Payments';

import Summary from './Summary/Summary';

import { getNavState, WizardSteps } from './wizard';

import styles from './DraftWizard.module.styl';

export default function DraftWizard({ draft, isLoading, tab, isSaving }) {
  const [active, setActive] = useState(tab);

  const next = useCallback(() => {
    setActive(active + 1);
  }, [active]);

  const back = useCallback(() => {
    setActive(active - 1);
  }, [active]);

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
        title={`${title} ${isSaving ? '...' : ''}`}
        top={false}
        logout={false}
        className={styles.navbar}
        theme="dark"
      >
        <Navigation onChange={setActive} active={active}>
          <NavItem {...nav.forms}>Create Job</NavItem>
          <NavItem {...nav.data}>Data</NavItem>
          <NavItem {...nav.settings}>Settings</NavItem>
          <NavItem {...nav.pay}>Pay</NavItem>
        </Navigation>
      </Navbar>
      <LoadIndicator isLoading={isLoading}>
        {draft && (
          <>
            {active === WizardSteps.Forms && (
              <JobForms draft={draft} onNext={next} />
            )}
            {active === WizardSteps.Data && (
              <Data draft={draft} onNext={next} onBack={back} />
            )}
            {active === WizardSteps.Settings && (
              <Settings draft={draft} onNext={next} onBack={back} />
            )}
            {active === WizardSteps.Pay && (
              <Payments draft={draft} onNext={next} onBack={back} />
            )}
            {active === WizardSteps.Summary && (
              <Summary draft={draft} onBack={next} onStep={setActive} />
            )}
          </>
        )}
      </LoadIndicator>
    </Page>
  );
}

DraftWizard.propTypes = {
  draft: draftProps,
  tab: PropTypes.number,
  isSaving: PropTypes.bool,
  isLoading: PropTypes.bool,
};

DraftWizard.defaultProps = {
  tab: 0,
  draft: null,
  isSaving: false,
  isLoading: false,
};
