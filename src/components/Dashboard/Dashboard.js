import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router-dom';

import Content from '../shared/Content';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';

import Navigation from './Navigation';

import List from './list/List';
import NewTask from './list/NewTask';
import TaskItem from './list/TaskItem';

import { fetchTasks } from '../../sagas/tasksSagas';
import { tasksSelector } from '../../selectors/tasksSelectors';

import styles from './Dashboard.module.styl';

const mapStateToProps = state => ({
  items: tasksSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTasks }, dispatch);

class Dashboard extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // eslint-disable-line
    items: PropTypes.arrayOf(PropTypes.object),
    fetchTasks: PropTypes.func.isRequired,
  };

  static defaultProps = {
    items: [],
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchTasks(match.params.category);
  }

  render() {
    const { items } = this.props;
    return (
      <Content title="Dashboard">
        <Navbar title="Dashboard">
          <Navigation className={styles.nav} />
        </Navbar>
        <Sidebar />
        <List className={styles.list}>
          <NewTask />
          {items.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      </Content>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dashboard)
);
