import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';
import { matchProps, taskStatsProps } from '../shared/propTypes';
import { authenticated } from '../shared/auth';

import Stats from './Stats';

import { makeTaskStatsSelector } from '../../selectors/tasksSelectors';
import { fetchTaskStatsStateSelector } from '../../selectors/uiStateSelectors';
import { fetchTaskStats } from '../../sagas/tasksSagas';

const makeMapStateToProps = () => {
  const raskStatsSelector = makeTaskStatsSelector();
  return (state, props) => ({
    stats: raskStatsSelector(state, +props.match.params.id),
    loadState: fetchTaskStatsStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTaskStats }, dispatch);

class Draft extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    stats: taskStatsProps,
    loadState: requestStateProps.isRequired,
    fetchTaskStats: PropTypes.func.isRequired,
  };

  static defaultProps = {
    stats: null,
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTaskStats(match.params.id);
  }

  componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.props.fetchTaskStats(match.params.id);
    }
  }

  render() {
    const { stats, loadState } = this.props;
    const isLoading = !stats && loadState.state === RequestStates.Fetching;

    return <Stats taskStats={stats} isLoading={isLoading} />;
  }
}

export default withRouter(
  authenticated(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(Draft)
  )
);
