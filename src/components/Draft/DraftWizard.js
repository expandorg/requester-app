import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { Navbar } from '@expandorg/components/app';

import { draftProps } from '../shared/propTypes';

import { Navigation, NavItem, DraftErrors } from './controls';

import Settings from './Settings/Settings';
import Data from './Data/Data';
import JobForms from './Forms/JobForms';
import Payments from './Payments/Payments';
import Summary from './Summary/Summary';

import styles from './DraftWizard.module.styl';

import WizardSteps from './WizardSteps';

export default function DraftWizard({ draft, tab, isSaving, validation }) {
  const [active, setActive] = useState({ tab });

  const navigate = useCallback((nav) => setActive(nav), []);
  const setTab = useCallback((i) => setActive({ tab: i }), []);
  const next = useCallback(() => setActive({ tab: active.tab + 1 }), [active]);
  const back = useCallback(() => setActive({ tab: active.tab - 1 }), [active]);

  const t = !isSaving ? draft.name : 'Saving...';
  return (
    <>
      <Navbar className={styles.navbar} title={t} theme="dark">
        <DraftErrors validation={validation} onNavigate={navigate} />
        <Navigation onChange={setTab} active={active.tab}>
          <NavItem>Create Job</NavItem>
          <NavItem>Data</NavItem>
          <NavItem>Settings</NavItem>
          <NavItem>Pay</NavItem>
        </Navigation>
      </Navbar>
      {active.tab === WizardSteps.Forms && (
        <JobForms
          tab={active.selected}
          validation={validation}
          draft={draft}
          onNext={next}
        />
      )}
      {active.tab === WizardSteps.Data && (
        <Data draft={draft} onNext={next} onBack={back} />
      )}
      {active.tab === WizardSteps.Settings && (
        <Settings draft={draft} onNext={next} onBack={back} />
      )}
      {active.tab === WizardSteps.Pay && (
        <Payments draft={draft} onNext={next} onBack={back} />
      )}
      {active.tab === WizardSteps.Summary && (
        <Summary
          draft={draft}
          validation={validation}
          onBack={back}
          onStep={setTab}
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
