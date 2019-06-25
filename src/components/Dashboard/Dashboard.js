import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import { matchProps } from '@expandorg/app-utils';
import { ListNav } from '@expandorg/components/app';

import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import { authenticated } from '../shared/auth';

import Page from '../shared/Page';

import List from './list/List';
import NewJob from './list/NewJob';
import JobItem from './list/JobItem';
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

const links = [
  {
    href: '/',
    text: 'All',
  },
  {
    href: '/tasks/draft',
    text: 'Draft',
  },
  {
    href: '/tasks/pending',
    text: 'Pending',
  },
  // {
  //   href: '/tasks/scheduled',
  //   text: 'Scheduled',
  // },
  {
    href: '/tasks/in-progress',
    text: 'In Progress',
  },
  // {
  //   href: '/tasks/completed',
  //   text: 'Completed',
  // },
];

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
      <Page title="Jobs">
        <Navbar title="Jobs" />
        <Sidebar />
        <ListNav navs={links} theme="raised" className={styles.navs} />
        {isEmpty && <Empty />}
        {!isEmpty && (
          <List className={styles.list}>
            {items.map(draft => (
              <JobItem
                key={draft.key}
                draft={draft}
                onCopy={this.props.copyDraft}
                onDelete={this.props.removeDraft}
              />
            ))}
            <NewJob small />
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
