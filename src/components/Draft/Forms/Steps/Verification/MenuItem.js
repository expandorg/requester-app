import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { NavItem, SettingsButton, ErrorIcon } from '../controls';
import { FormSelection } from '../../forms';

import Settings from './Settings';

import { draftProps } from '../../../../shared/propTypes';
import { DraftManager } from '../../../../../model/draft';
import { VerificationType } from '../../../../../model/enums';

export default function VerificationMenuItem({
  draft,
  selected,
  onSelect,
  validation,
}) {
  const [dialog, setDialog] = useState(false);

  const hasForm = DraftManager.hasVerificationForm(draft);

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
      <NavItem selected={selected} onClick={click}>
        Verification&nbsp;
        <SettingsButton onClick={iconClick} />
        <ErrorIcon error={validation} />
      </NavItem>
    </>
  );
}

VerificationMenuItem.propTypes = {
  draft: draftProps.isRequired,
  validation: PropTypes.shape({}),
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

VerificationMenuItem.defaultProps = {
  validation: null,
};
