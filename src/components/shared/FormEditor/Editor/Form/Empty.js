import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DropTarget } from 'react-dnd';

import { ReactComponent as Preview } from '@expandorg/uikit/assets/preview.svg';

import { emptyTarget, FORM_DND_ID } from '../../dnd';
import Placeholder from './Module/Placeholders/Placeholder';

import styles from './Empty.module.styl';

class Empty extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  };

  render() {
    const { connectDropTarget, canDrop } = this.props;

    return connectDropTarget(
      <div className={styles.container}>
        {!canDrop && (
          <div className={styles.content}>
            <div className={styles.preview}>
              <Preview
                className={styles.icon}
                width="144"
                height="110"
                viewBox="0 0 64 48"
              />
            </div>
            <div className={styles.text}>
              Please select an element form the left to begin creating your
              task.
            </div>
          </div>
        )}
        {canDrop && <Placeholder className={styles.placeholder} />}
      </div>
    );
  }
}

export const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
});

export default DropTarget(FORM_DND_ID, emptyTarget, collect)(Empty);
