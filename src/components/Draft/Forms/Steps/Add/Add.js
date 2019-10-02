import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import {
  WalkthroughPin,
  ContextMenu,
  ContextMenuItem,
} from '@expandorg/components/app';

import { draftProps } from '../../../../shared/propTypes';

import { formTemplatesSelector } from '../../../../../selectors/formTemplatesSelectors';
import { fetchFormTemplates } from '../../../../../sagas/formTemplateSagas';
import { updateOnboarding } from '../../../../../sagas/draftsSagas';

import { FormSelection } from '../../forms';
import DraftOnboarding from '../../../../../model/DraftOnboarding';

import styles from './Add.module.styl';

export default function Add({ draft, onSelect }) {
  const dispatch = useDispatch();

  const templates = useSelector(formTemplatesSelector);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchFormTemplates());
  }, [dispatch]);

  const add = useCallback(
    template => {
      setOpened(false);

      const onboarding = DraftOnboarding.add(draft, template);
      dispatch(updateOnboarding(draft.id, onboarding, true));

      const added = onboarding.steps[onboarding.steps.length - 1];
      onSelect(FormSelection.onboarding(added.id, added.isGroup));
    },
    [dispatch, draft, onSelect]
  );

  const open = useCallback(() => setOpened(true), []);

  return (
    <div className={styles.container}>
      <button className={styles.add} onClick={open} id="add-screen">
        +
      </button>
      <WalkthroughPin id="screen" className={styles.pin} />
      {opened && (
        <ContextMenu className={styles.menu} onHide={() => setOpened(false)}>
          <div className={styles.header}>Onboarding</div>
          <div className={styles.list}>
            {templates.map(template => (
              <ContextMenuItem key={template.id} onClick={() => add(template)}>
                {template.name}
              </ContextMenuItem>
            ))}
          </div>
        </ContextMenu>
      )}
    </div>
  );
}

Add.propTypes = {
  draft: draftProps.isRequired,
  onSelect: PropTypes.func.isRequired,
};
