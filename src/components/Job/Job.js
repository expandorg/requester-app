import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStates } from '@expandorg/app-utils';

import { Navbar } from '@expandorg/components/app';

import { Page } from '../shared/Page';

import LoadIndicator from '../shared/LoadIndicator';

import Stats from './Stats';
import ResultsTable from './Results/ResultsTable';
import Reports from './Reports/Reports';
import VerifyDialog from './Verify/VerifyDialog';

import { authenticated } from '../shared/auth';

import { makeJobStatsSelector } from '../../selectors/tasksSelectors';
import { jobReportSelector } from '../../selectors/jobReportsSelectors';
import { makeJobSelector } from '../../selectors/jobSelectos';
import { fetchJobStatsStateSelector } from '../../selectors/uiStateSelectors';
import { fetchJobStats } from '../../sagas/tasksSagas';
import { fetchJobReports } from '../../sagas/jobReportsSagas';
import { fetchJob } from '../../sagas/jobSagas';

import styles from './Job.module.styl';

function Job() {
  const dispatch = useDispatch();

  const id = +useParams().id;

  const loadState = useSelector(fetchJobStatsStateSelector);

  const jobSelector = useMemo(makeJobSelector);
  const job = useSelector(s => jobSelector(s, id));

  const jobStatsSelector = useMemo(makeJobStatsSelector);
  const stats = useSelector(s => jobStatsSelector(s, id));

  useEffect(() => {
    dispatch(fetchJob(id));
    dispatch(fetchJobStats(id));
    dispatch(fetchJobReports(id));
  }, [dispatch, id]);

  const [verify, setVerify] = useState(null);
  const hide = useCallback(() => setVerify(null), []);

  const reports = useSelector(jobReportSelector);
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
            <ResultsTable
              id={id}
              total={Math.ceil(stats.accepted / 15)}
              onVerify={setVerify}
            />
            <Reports reports={reports} />
          </div>
        )}
      </LoadIndicator>
      {!!verify && <VerifyDialog response={verify} job={job} onHide={hide} />}
    </Page>
  );
}

export default authenticated(Job);
