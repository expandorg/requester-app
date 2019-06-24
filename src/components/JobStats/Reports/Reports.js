import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';
import { Table as T } from '@expandorg/components';

import LoadIndicator from '../../shared/LoadIndicator';
import Header from './Header';
import Row from './Row';

import { fetchJobReportsStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Reports.module.styl';

const mapStateToProps = state => ({
  fetchState: fetchJobReportsStateSelector(state),
});

class Reports extends Component {
  static propTypes = {
    reports: PropTypes.arrayOf(PropTypes.shape({})),
    fetchState: requestStateProps.isRequired,
  };

  static defaultProps = {
    reports: [],
  };

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

export default connect(mapStateToProps)(Reports);
