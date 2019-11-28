import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { RequestStates } from '@expandorg/app-utils';
import { Table as T } from '@expandorg/components';
import { Pagination } from '@expandorg/components/app';

import { makeJobResponsesDataSelector } from '../../../selectors/jobResponsesSelectors';
import { fetchJobResponsesStateSelector } from '../../../selectors/uiStateSelectors';

import LoadIndicator from '../../shared/LoadIndicator';

import Header from './Header';
import Row from './Row';

import styles from './ResultsTable.module.styl';

export default function ResultsTable({ id, page, total, onChangePage }) {
  const responsesSelector = useMemo(makeJobResponsesDataSelector);
  const responses = useSelector(s => responsesSelector(s, id, page));

  const [mode, setMode] = useState('table');

  const fetchState = useSelector(fetchJobResponsesStateSelector);
  const isFetching = fetchState.state === RequestStates.Fetching;
  return (
    <div className={styles.container}>
      <div className={styles.header}>Task Results</div>
      <LoadIndicator isLoading={!responses && isFetching}>
        {responses && responses.length !== 0 && (
          <T.Table>
            <Header mode={mode} onToggle={setMode} />
            {responses.map(resp => (
              <Row key={resp.id} response={resp} mode={mode} />
            ))}
          </T.Table>
        )}
      </LoadIndicator>
      <Pagination
        className={styles.paging}
        current={page}
        total={total}
        onChange={onChangePage}
      />
    </div>
  );
}

ResultsTable.propTypes = {
  id: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
