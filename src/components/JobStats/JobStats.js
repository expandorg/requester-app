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

import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import { LoadIndicator } from '../Draft/Wizard/Form';

import Title from './Title';
import Stats from './Stats';
import JobResults from './JobResults';

import { jobStatsProps } from '../shared/propTypes';
import { authenticated } from '../shared/auth';

import { makeJobStatsSelector } from '../../selectors/tasksSelectors';
import { fetchJobStatsStateSelector } from '../../selectors/uiStateSelectors';
import { fetchJobStats, fetchResponses } from '../../sagas/tasksSagas';

import styles from './JobStats.module.styl';

const makeMapStateToProps = () => {
  const jobStatsSelector = makeJobStatsSelector();
  return (state, props) => ({
    stats: jobStatsSelector(state, +props.match.params.id),
    loadState: fetchJobStatsStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobStats, fetchResponses }, dispatch);

class JobStats extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    stats: jobStatsProps,
    loadState: requestStateProps.isRequired,
    fetchJobStats: PropTypes.func.isRequired,
    fetchResponses: PropTypes.func.isRequired,
  };

  static defaultProps = {
    stats: null,
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
  }

  componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.props.fetchJobStats(match.params.id);
      this.props.fetchResponses(match.params.id);
    }
  }

  handleChangePage = page => {
    const { match } = this.props;
    this.setState({ page });
    this.props.fetchResponses(match.params.id, page);
  };

  render() {
    const { stats, loadState } = this.props;
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
        <Navbar title={<Title stats={stats} />} top={false} logout={false} />
        <div className={styles.content}>
          <LoadIndicator isLoading={isLoading}>
            {stats && <Stats stats={stats} />}
            {stats && (
              <JobResults
                id={+id}
                page={page}
                total={Math.ceil(stats.accepted / 15)}
                onChangePage={this.handleChangePage}
              />
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
