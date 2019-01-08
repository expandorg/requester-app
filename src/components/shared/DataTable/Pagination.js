import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { range } from '@expandorg/utils/src/immutable';

import styles from './Pagination.module.styl';

const getPages = total => range(total);

export default class Pagination extends Component {
  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    display: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    current: 0,
    total: 0,
    display: 5,
  };

  handleClick = evt => {
    evt.preventDefault();

    const { onChange } = this.props;
    onChange(+evt.target.dataset.page);
  };

  render() {
    const { current, total, display } = this.props;
    if (!total) {
      return null;
    }
    const pages = getPages(total, current, display);

    return (
      <div className={styles.container}>
        {pages.map(p => (
          <button
            key={p}
            className={cn(styles.page, { [styles.active]: p === current })}
            data-page={p}
            onClick={this.handleClick}
          >
            {p + 1}
          </button>
        ))}
      </div>
    );
  }
}
