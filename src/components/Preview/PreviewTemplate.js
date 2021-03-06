import React, { useEffect, useCallback, useMemo } from 'react';

import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addNotification } from '@expandorg/app-utils/app';
import { Sidebar, Navbar } from '@expandorg/components/app';
import { Panel } from '@expandorg/components';
import { matchProps } from '@expandorg/app-utils';

import { Page } from '../shared/Page';
import PreviewDraftWorkflow from './draft/PreviewDraftWorkflow';

import { authenticated } from '../shared/auth';
import { fetchTaskTemplate } from '../../sagas/tasksSagas';
import { makeDraftFromTemplateSelector } from '../../selectors/taskTemplatesSelectors';

import styles from './styles.module.styl';

function PreviewTemplate({ match }) {
  const dispatch = useDispatch();
  const draftSelector = useMemo(makeDraftFromTemplateSelector, []);

  const draft = useSelector((state) => draftSelector(state, match.params.id));

  useEffect(() => {
    dispatch(fetchTaskTemplate(match.params.id));
  }, [dispatch, match.params.id]);

  const notify = useCallback(
    (type, message) => {
      dispatch(addNotification(type, message));
    },
    [dispatch]
  );

  return (
    <Page title="Preview" className={styles.page}>
      <Navbar title={draft ? draft.name : ''} />
      <Sidebar />
      <div className={styles.container}>
        <Panel className={styles.panel}>
          {draft && (
            <PreviewDraftWorkflow
              draft={draft}
              variables={draft.dataSample}
              onNotify={notify}
            />
          )}
        </Panel>
      </div>
    </Page>
  );
}

PreviewTemplate.propTypes = {
  match: matchProps.isRequired,
};

export default withRouter(authenticated(PreviewTemplate));
