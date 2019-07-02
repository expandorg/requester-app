import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../shared/Navbar';

import { draftProps } from '../shared/propTypes';

import { Navigation, NavItem } from './controls';
import Settings from './Settings/SettingsContainer';
import Data from './Data/Data';
import JobForms from './Forms/JobForms';
import Payments from './Payments/Payments';
import Summary from './Summary/Summary';

import styles from './DraftWizard.module.styl';

const WizardSteps = {
  Forms: 0,
  Data: 1,
  Settings: 2,
  // Whitelist: 3,
  Pay: 3,
  Summary: 4,
};

export default function DraftWizard({ draft, tab, isSaving, validation }) {
  const [active, setActive] = useState(tab);

  const next = useCallback(() => {
    setActive(active + 1);
  }, [active]);

  const back = useCallback(() => {
    setActive(active - 1);
  }, [active]);
  console.log(validation);

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
          <NavItem>Create Job</NavItem>
          <NavItem>Data</NavItem>
          <NavItem>Settings</NavItem>
          <NavItem>Pay</NavItem>
        </Navigation>
      </Navbar>
      {active === WizardSteps.Forms && (
        <JobForms validation={validation} draft={draft} onNext={next} />
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
        <Summary
          draft={draft}
          validation={validation}
          onBack={next}
          onStep={setActive}
        />
      )}
    </>
  );
}

DraftWizard.propTypes = {
  draft: draftProps.isRequired,
  validation: PropTypes.shape({}).isRequired,
  tab: PropTypes.number.isRequired,
  isSaving: PropTypes.bool.isRequired,
};
