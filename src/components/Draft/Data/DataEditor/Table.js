import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';

import { addNotification } from '@expandorg/app-utils/app';
import { DataTable, TableContainer } from '../DataTable';
import { Pagination } from '../../../common/Pagination';
import VariablesDialog from '../../Forms/Variables/VariablesDialog';

import { draftProps, dataProps } from '../../../shared/propTypes';
import LoadIndicator from '../../../shared/LoadIndicator';

import { uppdateColumns } from '../../../../sagas/dataSagas';
import { makeDataSelector } from '../../../../selectors/dataSelectors';
import { fetchDataStateSelector } from '../../../../selectors/uiStateSelectors';

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
    draft: draftProps.isRequired,
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

  state = { varsDialog: false };

  handleChangeColumn = (columns, isSkipping) => {
    const { draft } = this.props;
    if (isSkipping && !columns.some(c => !c.skipped)) {
      const message = 'You should import at least one column';
      this.props.addNotification('error', message);
    } else {
      this.props.uppdateColumns(draft.id, draft.dataId, columns);
    }
  };

  handleToggleDialog = () => {
    this.setState(({ varsDialog }) => ({ varsDialog: !varsDialog }));
  };

  render() {
    const {
      draft,
      data,
      page,
      fetchState,
      onDelete,
      onChangePage,
    } = this.props;

    const { varsDialog } = this.state;

    const isFetching = fetchState.state === RequestStates.Fetching;

    return (
      <TableContainer
        className={styles.container}
        footer={
          data && (
            <>
              <Pagination
                current={page}
                total={data.total - 1}
                onChange={onChangePage}
              />
              <button className={styles.delete} onClick={onDelete}>
                Remove data
              </button>
            </>
          )
        }
      >
        <LoadIndicator isLoading={!data && isFetching}>
          <DataTable
            data={data}
            variables={draft.variables}
            isFetching={isFetching}
            onChangeColumns={this.handleChangeColumn}
            onToggleVarsDialog={this.handleToggleDialog}
          />
        </LoadIndicator>
        {varsDialog && (
          <VariablesDialog
            draftId={draft.id}
            variables={draft.variables}
            onHide={this.handleToggleDialog}
          />
        )}
      </TableContainer>
    );
  }
}

export default connect(
  makeMapStatetoProps,
  mapDispatchToProps
)(Table);
