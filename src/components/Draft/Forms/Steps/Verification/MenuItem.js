import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { NavItem, SettingsButton } from '../controls';
import { FormSelection } from '../../forms';

import Settings from './Settings';

import { draftProps } from '../../../../shared/propTypes';
import DraftValidator from '../../../../../model/DraftValidator';
import { VerificationType } from '../../../../../model/enums';

export default function VerificationMenuItem({ draft, selected, onSelect }) {
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

  return (
    <>
      {dialog && (
        <Settings
          draft={draft}
          onHide={() => setDialog(false)}
          onSaved={saveComplete}
        />
      )}
      <NavItem id="add-verification" selected={selected} onClick={click}>
        Verification&nbsp;
        <SettingsButton onClick={iconClick} />
      </NavItem>
    </>
  );
}

VerificationMenuItem.propTypes = {
  draft: draftProps.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
