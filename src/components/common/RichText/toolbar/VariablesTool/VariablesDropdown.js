import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { clickOutside } from '@expandorg/components/hoc';

import styles from './VariablesDropdown.module.styl';

class VariablesDropdown extends Component {
  static propTypes = {
    variables: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    forwardedRef: PropTypes.object.isRequired, // eslint-disable-line
    onHide: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
  };

  handleClickOutside = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    const { onHide } = this.props;
    onHide();
  };

  handleClick = v => {
    const { onClick, onHide } = this.props;
    onClick(v);
    onHide();
  };

  render() {
    const { forwardedRef, variables, className } = this.props;
    return (
      <div className={cn(styles.dropdown, className)} ref={forwardedRef}>
        {variables.map(v => (
          <button
            className={styles.item}
            key={v}
            onClick={() => this.handleClick(v)}
          >
            + {v}
          </button>
        ))}
      </div>
    );
  }
}

export default clickOutside(VariablesDropdown);
