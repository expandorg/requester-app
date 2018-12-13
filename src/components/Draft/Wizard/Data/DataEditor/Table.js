import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import {
  DataTable,
  TableContainer,
  Pagination,
} from '../../../../shared/DataTable';

import { draftProps, dataProps } from '../../../../shared/propTypes';

import { LoadIndicator } from '../../Form';

import { uppdateColumns } from '../../../../../sagas/dataSagas';
import { addNotification } from '../../../../../sagas/notificationsSagas';
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ uppdateColumns, addNotification }, dispatch);

class Table extends Component {
  static propTypes = {
    draft: draftProps.isRequired, // eslint-disable-line
    data: dataProps,
    fetchState: requestStateProps.isRequired,
    page: PropTypes.number.isRequired,

    onDelete: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    uppdateColumns: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    data: null,
  };

  handleChangeColumn = (columns, isSkipping) => {
    const { draft } = this.props;
    if (isSkipping && !columns.some(c => !c.skipped)) {
      const message = 'You should import at least one column';
      this.props.addNotification('error', message);
    } else {
      this.props.uppdateColumns(draft.id, draft.dataId, columns);
    }
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
        <LoadIndicator isLoading={isFetching}>
          <DataTable
            data={data}
            isFetching={isFetching}
            onChangeColumns={this.handleChangeColumn}
          />
        </LoadIndicator>
      </TableContainer>
    );
  }
}

export default connect(
  makeMapStatetoProps,
  mapDispatchToProps
)(Table);
