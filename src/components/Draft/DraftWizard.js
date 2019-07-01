import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../shared/Navbar';

import { draftProps } from '../shared/propTypes';

import { Navigation, NavItem } from './Navigation';
import Settings from './Settings/SettingsContainer';
import Data from './Data/Data';
import JobForms from './Forms/JobForms';
import Payments from './Payments/Payments';
import Summary from './Summary/Summary';
import { getNavState, WizardSteps } from './wizard';

import styles from './DraftWizard.module.styl';

export default function DraftWizard({ draft, tab, isSaving }) {
  const [active, setActive] = useState(tab);

  const next = useCallback(() => {
    setActive(active + 1);
  }, [active]);

  const back = useCallback(() => {
    setActive(active - 1);
  }, [active]);

  const nav = getNavState(draft);
  return (
    <>
      <Navbar
        className={styles.navbar}
        title={!isSaving ? draft.name : 'Saving...'}
        theme="dark"
        top={false}
        logout={false}
      >
        <Navigation onChange={setActive} active={active}>
          <NavItem {...nav.forms}>Create Job</NavItem>
          <NavItem {...nav.data}>Data</NavItem>
          <NavItem {...nav.settings}>Settings</NavItem>
          <NavItem {...nav.pay}>Pay</NavItem>
        </Navigation>
      </Navbar>
      {active === WizardSteps.Forms && <JobForms draft={draft} onNext={next} />}
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
  );
}

DraftWizard.propTypes = {
  draft: draftProps.isRequired,
  tab: PropTypes.number,
  isSaving: PropTypes.bool,
};

DraftWizard.defaultProps = {
  tab: 0,
  isSaving: false,
};
