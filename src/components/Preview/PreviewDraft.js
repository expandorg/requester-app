import React, { useCallback, useEffect, useMemo } from 'react';

import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addNotification } from '@expandorg/app-utils/app';
import { Sidebar, Navbar } from '@expandorg/components/app';
import { Panel } from '@expandorg/components';
import { matchProps } from '@expandorg/app-utils';

import Page from '../shared/Page';

import PreviewDraftWorkflow from './draft/PreviewDraftWorkflow';

import { authenticated } from '../shared/auth';
import { fetch } from '../../sagas/draftsSagas';
import { fetch as fetchData } from '../../sagas/dataSagas';
import { makeDraftSelector } from '../../selectors/draftsSelectors';
import { makeVariablesSampleSelector } from '../../selectors/variablesSelectors';

import styles from './styles.module.styl';

function PreviewDraft({ match }) {
  const dispatch = useDispatch();

  const draftSelector = useMemo(makeDraftSelector, []);
  const draft = useSelector(state => draftSelector(state, match.params.id));

  const varsSampleSelector = useMemo(makeVariablesSampleSelector, []);
  const variables = useSelector(state =>
    varsSampleSelector(state, match.params.id, draft ? draft.dataId : null)
  );

  useEffect(() => {
    const handleMessage = ({ data }) => {
      if (typeof data === 'object' && data.type === 'updateDraft') {
        if (data.draft.id === match.params.id) {
          dispatch(fetch(match.params.id));
        }
      }
    };
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetch(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (draft && draft.dataId) {
      dispatch(fetchData(draft.id, draft.dataId, 0));
    }
  }, [dispatch, draft]);

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
              variables={variables}
              onNotify={notify}
            />
          )}
        </Panel>
      </div>
    </Page>
  );
}

PreviewDraft.propTypes = {
  match: matchProps.isRequired,
};

export default withRouter(authenticated(PreviewDraft));
