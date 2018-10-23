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
      columns: [],
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
            <div className={styles.actions}>
              <button className={styles.delete} onClick={this.handleDelete}>
                Remove data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
