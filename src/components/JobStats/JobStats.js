import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  matchProps,
} from '@expandorg/app-utils';

import { Navbar } from '@expandorg/components/app';

import Page from '../shared/Page';
import LoadIndicator from '../shared/LoadIndicator';

import Stats from './Stats';
import JobResults from './Results/JobResults';
import Reports from './Reports/Reports';

import { jobStatsProps } from '../shared/propTypes';
import { authenticated } from '../shared/auth';

import { makeJobStatsSelector } from '../../selectors/tasksSelectors';
import { jobReportSelector } from '../../selectors/jobReportsSelectors';
import { fetchJobStatsStateSelector } from '../../selectors/uiStateSelectors';
import { fetchJobStats, fetchResponses } from '../../sagas/tasksSagas';
import { fetchJobReports } from '../../sagas/jobReportsSagas';

import styles from './JobStats.module.styl';

const makeMapStateToProps = () => {
  const jobStatsSelector = makeJobStatsSelector();
  return (state, props) => ({
    stats: jobStatsSelector(state, +props.match.params.id),
    reports: jobReportSelector(state),
    loadState: fetchJobStatsStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchJobStats, fetchResponses, fetchJobReports },
    dispatch
  );

class JobStats extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    stats: jobStatsProps,
    loadState: requestStateProps.isRequired,
    reports: PropTypes.arrayOf(PropTypes.shape({})),
    fetchJobStats: PropTypes.func.isRequired,
    fetchResponses: PropTypes.func.isRequired,
    fetchJobReports: PropTypes.func.isRequired,
  };

  static defaultProps = {
    stats: null,
    reports: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      id: props.match.params.id,
    };
  }

  static getDerivedStateFromProps({ match }, state) {
    if (match.params.id !== state.id) {
      return {
        page: 0,
        id: match.params.id,
      };
    }
    return null;
  }

  componentDidMount() {
    const { match } = this.props;

    this.props.fetchJobStats(match.params.id);
    this.props.fetchResponses(match.params.id);
    this.props.fetchJobReports(match.params.id);
  }

  componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.props.fetchJobStats(match.params.id);
      this.props.fetchResponses(match.params.id);
      this.props.fetchJobReports(match.params.id);
    }
  }

  handleChangePage = page => {
    const { match } = this.props;
    this.setState({ page });
    this.props.fetchResponses(match.params.id, page);
  };

  render() {
    const { stats, loadState, reports } = this.props;
    const { id, page } = this.state;
    const isLoading = !stats && loadState.state === RequestStates.Fetching;

    return (
      <Page
        title={(stats && stats.job.name) || ''}
        sidebar={false}
        navbar={false}
        footer={false}
        className={styles.page}
      >
        <Navbar title="" top={false} />
        <div className={styles.content}>
          <LoadIndicator isLoading={isLoading}>
            {stats && (
              <>
                <Stats stats={stats} reports={reports.length} />
                <JobResults
                  id={+id}
                  page={page}
                  total={Math.ceil(stats.accepted / 15)}
                  onChangePage={this.handleChangePage}
                />
                <Reports reports={reports} />
              </>
            )}
          </LoadIndicator>
        </div>
      </Page>
    );
  }
}

export default withRouter(
  authenticated(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(JobStats)
  )
);
