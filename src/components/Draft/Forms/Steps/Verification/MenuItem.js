import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { WalkthroughPin } from '@expandorg/components/app';
import { verificationFormGenerator } from '@expandorg/modules/model';

import { NavItem, SettingsButton } from '../controls';
import { FormSelection } from '../../forms';

import Settings from './Settings';

import { draftProps } from '../../../../shared/propTypes';
import DraftValidator from '../../../../../model/DraftValidator';
import { VerificationType } from '../../../../../model/enums';

import styles from './MenuItem.module.styl';

export default function VerificationMenuItem({
  draft,
  selected,
  onSelect,
  onUpdate,
}) {
  const [dialog, setDialog] = useState(false);

  const hasForm = DraftValidator.hasVerificationForm(draft);

  const click = useCallback(() => {
    if (hasForm) {
      onSelect(FormSelection.verification);
    } else {
      setDialog(true);
    }
  }, [hasForm, onSelect]);

  const iconClick = useCallback(evt => {
    evt.stopPropagation();
    setDialog(true);
  }, []);

  const saveComplete = useCallback(() => {
    setDialog(false);
    if (draft.verification.module === VerificationType.Consensus) {
      if (selected) {
        onSelect(FormSelection.task);
      }
    } else if (!selected) {
      onSelect(FormSelection.verification);
    }
  }, [draft.verification.module, onSelect, selected]);

  const generateForm = useCallback(() => {
    setDialog(false);

    const f = verificationFormGenerator(draft.taskForm, draft.verificationForm);
    onUpdate(f);
    onSelect(FormSelection.verification);
  }, [draft.taskForm, draft.verificationForm, onSelect, onUpdate]);

  return (
    <>
      {dialog && (
        <Settings
          draft={draft}
          onHide={() => setDialog(false)}
          onSaved={saveComplete}
          onGenerate={generateForm}
        />
      )}
      <NavItem id="add-verification" selected={selected} onClick={click}>
        Verification&nbsp;
        <SettingsButton onClick={iconClick} />
        <WalkthroughPin id="verification" className={styles.pin} />
      </NavItem>
    </>
  );
}

VerificationMenuItem.propTypes = {
  draft: draftProps.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
