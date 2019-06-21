import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { ContextMenu, ContextMenuItem } from '../controls';

import { draftProps } from '../../../../../shared/propTypes';
import { formTemplatesSelector } from '../../../../../../selectors/formTemplatesSelectors';
import { fetchFormTemplates } from '../../../../../../sagas/formTemplateSagas';
import { updateOnboarding } from '../../../../../../sagas/draftsSagas';

import styles from './Add.module.styl';
import DraftOnboarding from '../../../../../../model/DraftOnboarding';

export default function Add({ draft }) {
  const dispatch = useDispatch();

  const templates = useSelector(formTemplatesSelector);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    dispatch(fetchFormTemplates());
  }, [dispatch]);

  const add = template => {
    const onboarding = DraftOnboarding.add(draft, template);
    dispatch(updateOnboarding(draft.id, onboarding));
    setOpened(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.add} onClick={() => setOpened(true)}>
        +
      </button>
      {opened && (
        <ContextMenu className={styles.menu} onHide={() => setOpened(false)}>
          {templates.map(template => (
            <ContextMenuItem key={template.id} onClick={() => add(template)}>
              {template.name}
            </ContextMenuItem>
          ))}
        </ContextMenu>
      )}
    </div>
  );
}

Add.propTypes = {
  draft: draftProps.isRequired,
};
