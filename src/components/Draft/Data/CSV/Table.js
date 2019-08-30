import React, { useState, useCallback, useMemo, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { deferComponentRender } from '@expandorg/components';
import { Pagination } from '@expandorg/components/app';
import { RequestStates } from '@expandorg/app-utils';
import { addNotification } from '@expandorg/app-utils/app';

import { DataTable, TableContainer } from '../DataTable';
import VariablesDialog from '../../Forms/Variables/VariablesDialog';

import { draftProps } from '../../../shared/propTypes';
import LoadIndicator from '../../../shared/LoadIndicator';

import { fetch, uppdateColumns } from '../../../../sagas/dataSagas';
import { makeDataSelector } from '../../../../selectors/dataSelectors';
import { fetchDataStateSelector } from '../../../../selectors/uiStateSelectors';

import styles from './Table.module.styl';

const message = 'You should import at least one column';

function Table({ draft }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  useEffect(() => {
    dispatch(fetch(draft.id, draft.dataId, page));
  }, [dispatch, draft.dataId, draft.id, page]);

  const dataSelector = useMemo(makeDataSelector, []);
  const data = useSelector(state => dataSelector(state, draft.dataId, page));

  const [varsDialog, setVarsDialog] = useState(false);

  const fetchState = useSelector(fetchDataStateSelector);

  const toggle = useCallback(() => {
    setVarsDialog(!varsDialog);
  }, [varsDialog]);

  const change = useCallback(
    (columns, isSkipping) => {
      if (isSkipping && !columns.some(c => !c.skipped)) {
        dispatch(addNotification('error', message));
      } else {
        dispatch(uppdateColumns(draft.id, draft.dataId, columns));
      }
    },
    [dispatch, draft.dataId, draft.id]
  );

  const isFetching = fetchState.state === RequestStates.Fetching;

  return (
    <TableContainer
      className={styles.container}
      footer={
        data && (
          <Pagination current={page} total={data.total} onChange={setPage} />
        )
      }
    >
      <LoadIndicator isLoading={!data && isFetching}>
        <DataTable
          data={data}
          variables={draft.variables}
          isFetching={isFetching}
          onChangeColumns={change}
          onToggleVarsDialog={toggle}
        />
      </LoadIndicator>
      {varsDialog && (
        <VariablesDialog
          draftId={draft.id}
          variables={draft.variables}
          onHide={toggle}
        />
      )}
    </TableContainer>
  );
}

Table.propTypes = {
  draft: draftProps.isRequired,
};

export default deferComponentRender(Table);
