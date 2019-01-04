import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { clickOutside } from '@gemsorg/components/hoc';

import styles from './VariablesTool.module.styl';

class VariablesDropdown extends Component {
  static propTypes = {
    variables: PropTypes.arrayOf(PropTypes.string).isRequired,
    forwardedRef: PropTypes.object.isRequired, // eslint-disable-line
    onHide: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
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
    const { forwardedRef, variables } = this.props;
    return (
      <div className={styles.dropdown} ref={forwardedRef}>
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
