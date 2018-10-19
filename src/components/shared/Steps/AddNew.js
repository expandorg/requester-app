import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './AddNew.module.styl';

export default class AddNew extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  handleAdd = evt => {
    const { onAdd } = this.props;
    evt.preventDefault();
    onAdd();
  };

  render() {
    return (
      <button className={styles.container} onClick={this.handleAdd}>
        <div className={styles.plus}>+</div>
        <div className={styles.add}>Add a new section to your task</div>
      </button>
    );
  }
}
