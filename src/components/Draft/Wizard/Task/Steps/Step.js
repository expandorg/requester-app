import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as X } from '@expandorg/uikit/assets/x.svg';
import { ReactComponent as Checkmark } from '@expandorg/uikit/assets/checkmark-2.svg';
import { ReactComponent as Warning } from '@expandorg/uikit/assets/warning.svg';

import styles from './Step.module.styl';

export default class Step extends Component {
  static propTypes = {
    id: PropTypes.string, // eslint-disable-line
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,

    isOnboarding: PropTypes.bool,
    isDragging: PropTypes.bool.isRequired,
    order: PropTypes.number,

    onMove: PropTypes.func, // eslint-disable-line
    onDelete: PropTypes.func,
    onEndDrag: PropTypes.func, // eslint-disable-line
  };

  static defaultProps = {
    id: null,
    order: null,
    isOnboarding: false,
    checked: null,
    onMove: null,
    onDelete: null,
    onEndDrag: null,
  };

  handleClick = evt => {
    evt.preventDefault();
    const { order, onSelect } = this.props;
    onSelect(order);
  };

  handleDelete = evt => {
    evt.preventDefault();
    const { order, onDelete } = this.props;
    onDelete(order);
  };

  render() {
    const { name, checked, isOnboarding, isDragging } = this.props;

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */
    const classes = cn(styles.outer, {
      [styles.dragging]: isDragging,
    });
    return (
      <div className={classes}>
        <div
          className={styles.container}
          onClick={this.handleClick}
          ref={c => {
            this.containerRef = c;
          }}
        >
          <div className={styles.name}>{name}</div>
          {checked !== null && (
            <div className={cn(styles.icon, { [styles.checked]: checked })}>
              {checked ? <Checkmark /> : <Warning />}
            </div>
          )}
        </div>
        {isOnboarding && (
          <button className={styles.remove} onClick={this.handleDelete}>
            <X />
          </button>
        )}
      </div>
    );
  }
}
