import React, { useState, useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Table from './Table';

import { draftProps } from '../../../shared/propTypes';
import { fetch } from '../../../../sagas/dataSagas';

import DraftValidator from '../../../../model/DraftValidator';

import styles from './Data.module.styl';

export default function Data({ draft }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (draft.dataId) {
      dispatch(fetch(draft.id, draft.dataId, page));
    }
  }, [dispatch, draft.dataId, draft.id, page]);

  const changePage = useCallback((p) => setPage(p), []);

  const hasData = DraftValidator.hasData(draft);
  return (
    <div className={styles.container}>
      {hasData && <Table draft={draft} page={page} onChangePage={changePage} />}
      {!hasData && <div className={styles.emptyData}>No data uploaded.</div>}
    </div>
  );
}

Data.propTypes = {
  draft: draftProps.isRequired,
};
