import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { withRouter } from 'react-router-dom';

import { matchProps } from '@expandorg/app-utils';
import { addNotification } from '@expandorg/app-utils/app';
import { ListNav, Navbar } from '@expandorg/components/app';

import Media from 'react-media';

import { authenticated } from '../shared/auth';

import { Page, Sidebar } from '../shared/Page';

import Item from './Item/Item';
import New from './Item/New';
import Empty from './Empty';

import { fetchTasks } from '../../sagas/tasksSagas';
import { removeDraft, copyDraft } from '../../sagas/draftsSagas';

import { dashboardTasksSelector } from '../../selectors/tasksSelectors';

import styles from './Dashboard.module.styl';

const q = { hover: 'none' };

const links = [
  { href: '/', text: 'All' },
  { href: '/tasks/draft', text: 'Draft' },
  { href: '/tasks/pending', text: 'Pending' },
  { href: '/tasks/in-progress', text: 'In Progress' },
];

function Dashboard({ match }) {
  const dispatch = useDispatch();
  const items = useSelector(dashboardTasksSelector);

  useEffect(() => {
    dispatch(fetchTasks(match.params.category));
  }, [dispatch, match.params.category]);

  const copy = useCallback(
    draft => {
      dispatch(copyDraft(draft));
    },
    [dispatch]
  );

  const del = useCallback(
    draft => {
      dispatch(removeDraft(draft));
    },
    [dispatch]
  );

  const notify = useCallback(
    (type, msg) => {
      dispatch(addNotification(type, msg));
    },
    [dispatch]
  );

  const isEmpty = items.length === 0;
  return (
    <Page title="Jobs">
      <Navbar title="Jobs" />
      <Sidebar />
      <ListNav navs={links} theme="underline" className={styles.navs} />
      {isEmpty && <Empty />}
      {!isEmpty && (
        <Media query={q}>
          {isMobile => (
            <div className={styles.list}>
              <New />
              {items.map(draft => (
                <Item
                  isMobile={isMobile}
                  key={draft.id}
                  draft={draft}
                  onNotify={notify}
                  onCopy={copy}
                  onDelete={del}
                />
              ))}
            </div>
          )}
        </Media>
      )}
    </Page>
  );
}

Dashboard.propTypes = {
  match: matchProps.isRequired,
};

export default withRouter(authenticated(Dashboard));
