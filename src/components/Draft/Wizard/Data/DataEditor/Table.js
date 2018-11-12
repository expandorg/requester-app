import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import {
  DataTable,
  TableContainer,
  Pagination,
} from '../../../../shared/DataTable';

import { draftProps, dataProps } from '../../../../shared/propTypes';

import { makeDataSelector } from '../../../../../selectors/dataSelectors';
import { fetchDataStateSelector } from '../../../../../selectors/uiStateSelectors';

import styles from './Table.module.styl';

const makeMapStatetoProps = () => {
  const dataSelector = makeDataSelector();
  return (state, props) => ({
    data: dataSelector(state, props.draft.dataId, props.page),
    fetchState: fetchDataStateSelector(state),
  });
};

class Table extends Component {
  static propTypes = {
    draft: draftProps.isRequired, // eslint-disable-line
    data: dataProps,
    fetchState: requestStateProps.isRequired,
    page: PropTypes.number.isRequired,

    onDelete: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  render() {
    const { data, page, fetchState, onDelete, onChangePage } = this.props;

    const isFetching = fetchState.state === RequestStates.Fetching;

    return (
      <TableContainer
        className={styles.container}
        footer={
          data && (
            <>
              <Pagination
                current={page}
                total={data.total}
                onChange={onChangePage}
              />
              <button className={styles.delete} onClick={onDelete}>
                Remove data
              </button>
            </>
          )
        }
      >
        <DataTable
          data={data}
          isFetching={isFetching}
          onChange={this.handleChangeData}
        />
      </TableContainer>
    );
  }
}

export default connect(makeMapStatetoProps)(Table);
