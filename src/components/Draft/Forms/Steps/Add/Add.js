import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { WalkthroughPin } from '@expandorg/components/app';

import { ContextMenu, ContextMenuItem } from '../../../../common/ContextMenu';

import { draftProps } from '../../../../shared/propTypes';
import { formTemplatesSelector } from '../../../../../selectors/formTemplatesSelectors';
import { fetchFormTemplates } from '../../../../../sagas/formTemplateSagas';
import { updateOnboarding } from '../../../../../sagas/draftsSagas';
import DraftOnboarding from '../../../../../model/DraftOnboarding';

import Quiz from '../../Quiz/Quiz';

import styles from './Add.module.styl';

export default function Add({ draft }) {
  const dispatch = useDispatch();

  const templates = useSelector(formTemplatesSelector);
  const [opened, setOpened] = useState(false);
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    dispatch(fetchFormTemplates());
  }, [dispatch]);

  const add = useCallback(
    template => {
      const onboarding = DraftOnboarding.add(draft, template);

      dispatch(updateOnboarding(draft.id, onboarding, true));
      setOpened(false);

      const lastStep = onboarding.steps[onboarding.steps.length - 1];
      if (lastStep.isGroup) {
        setQuiz(lastStep);
      }
    },
    [dispatch, draft]
  );

  const updateQuiz = useCallback(
    updatedStep => {
      const onboarding = DraftOnboarding.update(draft, updatedStep);
      dispatch(updateOnboarding(draft.id, onboarding, true));
    },
    [dispatch, draft]
  );

  return (
    <div className={styles.container}>
      <button
        className={styles.add}
        onClick={() => setOpened(true)}
        id="add-screen"
      >
        +
      </button>
      <WalkthroughPin id="screen" className={styles.pin} />
      {opened && (
        <ContextMenu className={styles.menu} onHide={() => setOpened(false)}>
          <div className={styles.header}>Templates</div>
          <div className={styles.list}>
            {templates.map(template => (
              <ContextMenuItem key={template.id} onClick={() => add(template)}>
                {template.name}
              </ContextMenuItem>
            ))}
          </div>
        </ContextMenu>
      )}
      {!!quiz && (
        <Quiz
          group={quiz}
          visible
          onHide={() => setQuiz(null)}
          onUpdate={updateQuiz}
        />
      )}
    </div>
  );
}

Add.propTypes = {
  draft: draftProps.isRequired,
};
