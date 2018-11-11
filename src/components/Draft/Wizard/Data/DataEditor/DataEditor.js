import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Description } from '../../Form';

import {
  DataTable,
  TableContainer,
  Pagination,
} from '../../../../shared/DataTable';
import { draftProps } from '../../../../shared/propTypes';

import ConfirmationDialog from './ConfirmationDialog';

import { removeData } from '../../../../../sagas/dataSagas';

import styles from './DataEditor.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeData }, dispatch);

class DataEditor extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    removeData: PropTypes.func.isRequired,
  };

  state = {
    data: {
      columns: [
        { name: 'column 1', type: 'string', skipped: false },
        { name: 'column 2', type: 'string', skipped: false },
        { name: 'column 3', type: 'string', skipped: false },
        { name: 'column 4', type: 'string', skipped: true },
        { name: 'column 5', type: 'string', skipped: false },
        // { name: 'column 6', type: 'string', skipped: false },
        // { name: 'column 7', type: 'string', skipped: false },
        // { name: 'column 8', type: 'string', skipped: false },
        // { name: 'column 9', type: 'string', skipped: false },
      ],
      values: [
        [10, 11, 12, 13, 14], // , 15, 16, 17, 18],
        [20, 21, 22, 23, 24], // , 25, 26, 27, 28],
        [30, 31, 32, 33, 34], // , 35, 36, 37, 38],
        [40, 41, 42, 43, 44], // , 45, 46, 47, 48],
        [50, 51, 52, 53, 54], // , 55, 56, 57, 58],
        [60, 61, 62, 63, 64], // , 65, 66, 67, 68],
      ],
    },
    dialog: false,
  };

  handleDelete = () => {
    const { draft } = this.props;
    this.props.removeData(draft.id);
    this.setState({ dialog: false });
  };

  handleChangeData = data => {
    this.setState({ data });
  };

  handleToggleDelete = evt => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState(({ dialog }) => ({ dialog: !dialog }));
  };

  render() {
    const { draft } = this.props;
    const { data, dialog } = this.state;
    console.log(draft);
    return (
      <div className={styles.container}>
        <Description>Description about this step goes here.</Description>
        <TableContainer
          className={styles.content}
          footer={
            <>
              <Pagination />
              <button
                className={styles.delete}
                onClick={this.handleToggleDelete}
              >
                Remove data
              </button>
            </>
          }
        >
          <DataTable data={data} onChange={this.handleChangeData} />
        </TableContainer>
        {dialog && (
          <ConfirmationDialog
            onDelete={this.handleDelete}
            onHide={this.handleToggleDelete}
          />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DataEditor);
