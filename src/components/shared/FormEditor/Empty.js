import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DropTarget } from 'react-dnd';

import { ReactComponent as Preview } from '../../assets/preview.svg';

import styles from './Empty.module.styl';

class Empty extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  };

  render() {
    const { connectDropTarget, canDrop } = this.props;

    return connectDropTarget(
      <div className={cn(styles.container, { [styles.dropzone]: canDrop })}>
        <div className={styles.preview}>
          <Preview
            className={styles.icon}
            width="144"
            height="110"
            viewBox="0 0 64 48"
          />
        </div>
        <div className={styles.text}>
          Please select an element form the left to begin creating your task.
        </div>
      </div>
    );
  }
}

const target = {
  canDrop: () => true,
  hover: () => {},
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
});

export default DropTarget('asd', target, collect)(Empty);
