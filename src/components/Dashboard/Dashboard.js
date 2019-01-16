import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import { matchProps } from '@expandorg/app-utils';
import { authenticated } from '../shared/auth';

import Page from '../shared/Page';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Navigation from './Navigation';

import List from './list/List';
import NewTask from './list/NewTask';
import TaskItem from './list/TaskItem';
import Empty from './list/Empty';

import { fetchTasks } from '../../sagas/tasksSagas';
import { removeDraft, copyDraft } from '../../sagas/draftsSagas';
import { dashboardTasksSelector } from '../../selectors/tasksSelectors';

import styles from './Dashboard.module.styl';

const mapStateToProps = state => ({
  items: dashboardTasksSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTasks, removeDraft, copyDraft }, dispatch);

class Dashboard extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    fetchTasks: PropTypes.func.isRequired,
    removeDraft: PropTypes.func.isRequired,
    copyDraft: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTasks(match.params.category);
  }

  componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props;
    if (match.params.category !== prevMatch.params.category) {
      this.props.fetchTasks(match.params.category);
    }
  }

  render() {
    const { items } = this.props;
    const isEmpty = items.length === 0;
    return (
      <Page title="Dashboard">
        <Navbar title="Dashboard" />
        <Sidebar />
        <Navigation />
        {isEmpty && <Empty />}
        {!isEmpty && (
          <List className={styles.list}>
            <NewTask />
            {items.map(task => (
              <TaskItem
                key={task.key}
                task={task}
                onCopy={this.props.copyDraft}
                onDelete={this.props.removeDraft}
              />
            ))}
          </List>
        )}
      </Page>
    );
  }
}

export default withRouter(
  authenticated(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Dashboard)
  )
);
