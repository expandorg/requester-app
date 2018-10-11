import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as DragIcon } from '../../../assets/dragcursor.svg';

import styles from './ModuleItem.module.styl';

export default class ModuleItem extends Component {
  static propTypes = {
    module: PropTypes.shape({
      type: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { module } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.drag}>
          <DragIcon />
        </div>
        <div className={styles.name}>{module.type}</div>
      </div>
    );
  }
}
