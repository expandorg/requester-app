import React, { useEffect, useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStates } from '@expandorg/app-utils';

import { Navbar } from '@expandorg/components/app';

import { Page } from '../shared/Page';

import LoadIndicator from '../shared/LoadIndicator';

import Stats from './Stats';
import ResultsTable from './Results/ResultsTable';
import Reports from './Reports/Reports';

import { authenticated } from '../shared/auth';

import { makeJobStatsSelector } from '../../selectors/tasksSelectors';
import { jobReportSelector } from '../../selectors/jobReportsSelectors';
import { fetchJobStatsStateSelector } from '../../selectors/uiStateSelectors';
import { fetchJobStats } from '../../sagas/tasksSagas';
import { fetchJobReports } from '../../sagas/jobReportsSagas';

import styles from './Job.module.styl';

function Job() {
  const dispatch = useDispatch();

  const id = +useParams().id;

  const loadState = useSelector(fetchJobStatsStateSelector);
  const jobStatsSelector = useMemo(makeJobStatsSelector);
  const stats = useSelector(s => jobStatsSelector(s, id));

  const reports = useSelector(jobReportSelector);

  useEffect(() => {
    dispatch(fetchJobStats(id));
    dispatch(fetchJobReports(id));
  }, [dispatch, id]);

  const isLoading = !stats && loadState.state === RequestStates.Fetching;
  return (
    <Page
      title={(stats && stats.job.name) || ''}
      sidebar={false}
      navbar={false}
      footer={false}
    >
      <Navbar top={false} />
      <LoadIndicator isLoading={isLoading}>
        {stats && (
          <div className={styles.content}>
            <Stats stats={stats} reports={reports.length} />
            <ResultsTable total={Math.ceil(stats.accepted / 15)} id={id} />
            <Reports reports={reports} />
          </div>
        )}
      </LoadIndicator>
    </Page>
  );
}

export default authenticated(Job);
