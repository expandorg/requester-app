import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { NavItem, SettingsButton } from '../controls';
import { FormSelection } from '../../forms';

import Settings from './Settings';

import { draftProps } from '../../../../../shared/propTypes';
import { DraftManager } from '../../../../../../model/draft';

export default function VerificationMenuItem({ draft, selected, onSelect }) {
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

  return (
    <>
      {dialog && <Settings draft={draft} onHide={() => setDialog(false)} />}
      <NavItem selected={selected} onClick={click}>
        Verification <SettingsButton onClick={iconClick} />
      </NavItem>
    </>
  );
}

VerificationMenuItem.propTypes = {
  draft: draftProps.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};
