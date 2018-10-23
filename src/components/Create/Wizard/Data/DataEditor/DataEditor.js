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
      ],
      values: [],
    },
  };

  handleDelete = evt => {
    const { onDelete } = this.props;
    onDelete();

    evt.preventDefault();
  };

  render() {
    const { data } = this.state;
    return (
      <div className={styles.container}>
        <Description>Description about this step goes here.</Description>
        <div className={styles.content}>
          <Table data={data} />
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
