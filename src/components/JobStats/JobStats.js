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

import { jobStatsProps } from '../shared/propTypes';
import { authenticated } from '../shared/auth';

import Stats from './Stats';

import { makeJobStatsSelector } from '../../selectors/tasksSelectors';
import { fetchJobStatsStateSelector } from '../../selectors/uiStateSelectors';
import { fetchJobStats } from '../../sagas/tasksSagas';

const makeMapStateToProps = () => {
  const jobStatsSelector = makeJobStatsSelector();
  return (state, props) => ({
    stats: jobStatsSelector(state, +props.match.params.id),
    loadState: fetchJobStatsStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobStats }, dispatch);

class JobStats extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    stats: jobStatsProps,
    loadState: requestStateProps.isRequired,
    fetchJobStats: PropTypes.func.isRequired,
  };

  static defaultProps = {
    stats: null,
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchJobStats(match.params.id);
  }

  componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.props.fetchJobStats(match.params.id);
    }
  }

  render() {
    const { stats, loadState } = this.props;
    const isLoading = !stats && loadState.state === RequestStates.Fetching;
    console.log(stats);

    return <Stats stats={stats} isLoading={isLoading} />;
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
