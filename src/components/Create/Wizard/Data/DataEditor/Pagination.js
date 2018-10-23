import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { range } from '@gemsorg/utils/src/immutable';

import styles from './Pagination.module.styl';

export default class Pagination extends Component {
  static propTypes = {
    page: PropTypes.number,
    total: PropTypes.number,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    page: 0,
    total: 5,
    onChange: Function.prototype,
  };

  handleClick = evt => {
    evt.preventDefault();

    const { onChange } = this.props;
    onChange(+evt.target.dataset.page);
  };

  render() {
    const { page, total } = this.props;
    return (
      <div className={styles.container}>
        {range(total).map(p => (
          <button
            key={p}
            className={cn(styles.page, { [styles.active]: p === page })}
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
