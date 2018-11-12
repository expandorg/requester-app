import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { range } from '@gemsorg/utils/src/immutable';

import styles from './Pagination.module.styl';

export default class Pagination extends Component {
  static propTypes = {
    current: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    current: 0,
    total: 0,
  };

  handleClick = evt => {
    evt.preventDefault();

    const { onChange } = this.props;
    onChange(+evt.target.dataset.page);
  };

  render() {
    const { current, total } = this.props;
    if (!total) {
      return null;
    }

    return (
      <div className={styles.container}>
        {range(total).map(p => (
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
