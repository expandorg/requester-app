import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Table.module.styl';

export default class ScrollContainer extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, className } = this.props;

    return (
      <div className={cn(styles.scroll, className)}>
        <div className={styles.inner}>{children}</div>
      </div>
    );
  }
}
