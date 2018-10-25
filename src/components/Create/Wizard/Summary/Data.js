import React, { Component } from 'react';

import {
  DataTable,
  TableContainer,
  Pagination,
} from '../../../shared/DataTable';

import styles from './Data.module.styl';

const data = {
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
};

export default class Data extends Component {
  render() {
    return (
      <div className={styles.container}>
        <TableContainer footer={<Pagination />} className={styles.content}>
          <DataTable data={data} readOnly />
        </TableContainer>
      </div>
    );
  }
}
