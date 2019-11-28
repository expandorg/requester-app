import React, { useCallback, useState, useMemo } from 'react';
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
import SelectedRowDialog from './Preview/SelectedRowDialog';

import styles from './JobResults.module.styl';

export default function JobResults({ id, page, total, onChangePage }) {
  const responsesSelector = useMemo(makeJobResponsesDataSelector);
  const responses = useSelector(s => responsesSelector(s, id, page));

  const [selected, select] = useState(null);
  const [mode, setMode] = useState('table');

  const hide = useCallback(() => select(null), []);
  const next = useCallback(() => select(s => s + 1), []);
  const prev = useCallback(() => select(s => s - 1), []);

  const fetchState = useSelector(fetchJobResponsesStateSelector);
  const isFetching = fetchState.state === RequestStates.Fetching;
  return (
    <div className={styles.container}>
      <div className={styles.header}>Task Results</div>
      <LoadIndicator isLoading={!responses && isFetching}>
        {responses && responses.length !== 0 && (
          <T.Table>
            <Header mode={mode} onToggle={setMode} />
            {responses.map((resp, i) => (
              <Row
                key={resp.id}
                response={resp}
                index={i}
                mode={mode}
                onSelectValue={select}
              />
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
      {selected !== null && (
        <SelectedRowDialog
          response={responses[selected]}
          index={selected}
          mode={mode}
          count={responses.length}
          onHide={hide}
          onNext={next}
          onPrev={prev}
        />
      )}
    </div>
  );
}

JobResults.propTypes = {
  id: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};
