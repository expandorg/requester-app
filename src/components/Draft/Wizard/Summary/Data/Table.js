import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';

import {
  DataTable,
  TableContainer,
  Pagination,
} from '../../../../shared/DataTable';

import { dataProps } from '../../../../shared/propTypes';

import { makeDataSelector } from '../../../../../selectors/dataSelectors';
import { fetchDataStateSelector } from '../../../../../selectors/uiStateSelectors';

import styles from './Data.module.styl';

const makeMapStatetoProps = () => {
  const dataSelector = makeDataSelector();
  return (state, props) => ({
    data: dataSelector(state, props.draft.dataId, props.page),
    fetchState: fetchDataStateSelector(state),
  });
};

class Table extends Component {
  static propTypes = {
    data: dataProps,
    page: PropTypes.number.isRequired,
    fetchState: requestStateProps.isRequired,
    onChangePage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  render() {
    const { data, page, fetchState, onChangePage } = this.props;
    return (
      <TableContainer
        className={styles.content}
        footer={
          data && (
            <Pagination
              current={page}
              total={data.total - 1}
              onChange={onChangePage}
            />
          )
        }
      >
        <DataTable
          readOnly
          data={data}
          isFetching={fetchState.state === RequestStates.Fetching}
        />
      </TableContainer>
    );
  }
}

export default connect(makeMapStatetoProps)(Table);
