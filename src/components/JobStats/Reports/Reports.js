import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';
import { Table as T } from '@expandorg/components';

import { LoadIndicator } from '../../Draft/Wizard/Form';
import Header from './Header';
import Row from './Row';

import { fetchJobReports } from '../../../sagas/jobReportsSagas';
import { jobReportSelector } from '../../../selectors/jobReportsSelectors';
import { fetchJobReportsStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Reports.module.styl';

const mapStateToProps = state => ({
  reports: jobReportSelector(state),
  fetchState: fetchJobReportsStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchJobReports }, dispatch);

class Reports extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    reports: PropTypes.arrayOf(PropTypes.shape({})),
    fetchState: requestStateProps.isRequired,
    fetchJobReports: PropTypes.func.isRequired,
  };

  static defaultProps = {
    reports: [],
  };

  componentDidMount() {
    const { id } = this.props;
    this.props.fetchJobReports(id);
  }

  render() {
    const { fetchState, reports } = this.props;
    const isFetching = fetchState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <div className={styles.header}>Reported Questions</div>
        <LoadIndicator isLoading={isFetching}>
          <T.Table className={styles.table}>
            <Header />
            {reports.length !== 0 &&
              reports.map(report => <Row key={report.id} report={report} />)}
          </T.Table>
        </LoadIndicator>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
