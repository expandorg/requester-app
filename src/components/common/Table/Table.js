import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Table.module.styl';

export default class Table extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { children, className } = this.props;

    return (
      <table className={cn(styles.container, className)}>
        <tbody className={styles.body}>{children}</tbody>
      </table>
    );
  }
}
