import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { range } from '@gemsorg/utils/src/immutable';

import styles from './Watch.module.styl';

const getTransform = d =>
  `rotate(${d * 30}deg) translate(0, -73px) rotate(-${d * 30}deg)`;

export default class Watch extends Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleClick = evt => {
    evt.preventDefault();

    const { onChange } = this.props;
    onChange(+evt.target.dataset.hour);
  };

  render() {
    const { time } = this.props;

    return (
      <div className={styles.container}>
        <div
          className={styles.arrow}
          style={{ transform: `rotate(${(time - 3) * 30}deg)` }}
        />
        {range(12).map(h => (
          <button
            key={h}
            onClick={this.handleClick}
            type="button"
            data-hour={h}
            className={cn(styles.digit, { [styles.selected]: h === time })}
            style={{ transform: getTransform(h) }}
          >
            {h || 12}
          </button>
        ))}
      </div>
    );
  }
}
