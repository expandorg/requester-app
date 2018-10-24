import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Description } from '../../Form';

import Table from './Table';
import Pagination from './Pagination';

import styles from './DataEditor.module.styl';

export default class DataEditor extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired, // eslint-disable-line
  };

  state = {
    data: {
      columns: [
        { name: 'column 1', type: 'string', skipped: false },
        { name: 'column 2', type: 'string', skipped: false },
        { name: 'column 3', type: 'string', skipped: false },
        { name: 'column 4', type: 'string', skipped: true },
        // { name: 'column 5', type: 'string', skipped: false },
      ],
      values: [
        [10, 11, 12, 13], // 14],
        [20, 21, 22, 23], // 24],
        [30, 31, 32, 33], // 34],
        [40, 41, 42, 43], // 44],
        [50, 51, 52, 53], // 54],
        [60, 61, 62, 63], // 64],
      ],
    },
  };

  handleDelete = evt => {
    const { onDelete } = this.props;
    onDelete();

    evt.preventDefault();
  };

  handleChangeData = data => {
    this.setState({ data });
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Description>Description about this step goes here.</Description>
        <div className={styles.content}>
          <Table data={data} onChange={this.handleChangeData} />
          <div className={styles.footer}>
            <Pagination />
            <button className={styles.delete} onClick={this.handleDelete}>
              Remove data
            </button>
          </div>
        </div>
      </div>
    );
  }
}
