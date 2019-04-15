import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'date-fns';

import { connect } from 'react-redux';
import { requestStateProps, RequestStates } from '@expandorg/app-utils';

import { Table as T } from '@expandorg/components';

import { LoadIndicator } from '../Draft/Wizard/Form';

import { makeJobResponsesDataSelector } from '../../selectors/jobResponsesSelectors';
import { fetchJobResponsesStateSelector } from '../../selectors/uiStateSelectors';

import { Pagination } from '../shared/DataTable';

import { formatDate } from '../../model/i18n';

import styles from './JobResults.module.styl';

const makeMapStateToProps = () => {
  const responsesSelector = makeJobResponsesDataSelector();
  return (state, props) => ({
    responses: responsesSelector(state, props.id, props.page),
    fetchState: fetchJobResponsesStateSelector(state),
  });
};

class JobResults extends Component {
  static propTypes = {
    responses: PropTypes.arrayOf(PropTypes.shape({})),
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    fetchState: requestStateProps.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    responses: null,
  };

  render() {
    const { fetchState, responses, page, total, onChangePage } = this.props;
    const isFetching = fetchState.state === RequestStates.Fetching;
    return (
      <div className={styles.container}>
        <div className={styles.header}>Task Results</div>
        <LoadIndicator isLoading={!responses && isFetching}>
          {responses && (
            <T.Table>
              <T.Header className={styles.header}>
                <T.HeaderCell>Item Id</T.HeaderCell>
                <T.HeaderCell>Result</T.HeaderCell>
                <T.HeaderCell>Worker Id</T.HeaderCell>
                <T.HeaderCell>Date</T.HeaderCell>
              </T.Header>
              {responses.map(resp => (
                <T.Row key={resp.id}>
                  <T.Cell className={styles.cell}>{resp.id}</T.Cell>
                  <T.Cell className={styles.valueCell}>
                    <div className={styles.value}>
                      {JSON.stringify(resp.value)}
                    </div>
                  </T.Cell>
                  <T.Cell className={styles.cell}>{resp.worker_id}</T.Cell>
                  <T.Cell className={styles.cell}>
                    {formatDate(parse(resp.created_at))}
                  </T.Cell>
                </T.Row>
              ))}
            </T.Table>
          )}
        </LoadIndicator>
        <Pagination
          className={styles.paging}
          current={page}
          total={total}
          onChange={onChangePage}
        />
      </div>
    );
  }
}

export default connect(makeMapStateToProps)(JobResults);
