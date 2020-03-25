import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { RequestStates } from '@expandorg/app-utils';
import { Table as T } from '@expandorg/components';

import LoadIndicator from '../../shared/LoadIndicator';
import Header from './Header';
import Row from './Row';

import { fetchJobReportsStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Reports.module.styl';

export default function Reports({ reports }) {
  const fetchState = useSelector(fetchJobReportsStateSelector);
  const isFetching = fetchState.state === RequestStates.Fetching;

  return (
    <div className={styles.container}>
      <LoadIndicator isLoading={isFetching}>
        {reports.length !== 0 && (
          <>
            <div className={styles.header}>Reported Questions</div>
            <T.Table className={styles.table}>
              <Header />
              {reports.map((report) => (
                <Row key={report.id} report={report} />
              ))}
            </T.Table>
          </>
        )}
      </LoadIndicator>
    </div>
  );
}

Reports.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape({})),
};

Reports.defaultProps = {
  reports: [],
};
