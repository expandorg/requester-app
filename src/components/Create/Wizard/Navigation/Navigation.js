import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

import styles from './Navigation.module.styl';

export default class Navigation extends Component {
  static propTypes = {
    active: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: null,
  };

  render() {
    const { children, active, onChange } = this.props;
    return (
      <div className={styles.container}>
        {Children.map(children, (item, index) =>
          cloneElement(item, {
            active: active === index,
            onClick: evt => onChange(index, evt),
          })
        )}
      </div>
    );
  }
}
