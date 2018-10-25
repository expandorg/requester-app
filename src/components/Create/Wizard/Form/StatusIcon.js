import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Checkmark } from '../../../assets/checkmark.svg';
import { ReactComponent as I } from '../../../assets/i.svg';

import styles from './StatusIcon.module.styl';

export default class StatusIcon extends Component {
  static propTypes = {
    className: PropTypes.string,
    status: PropTypes.oneOf(['complete', 'required']),
  };

  static defaultProps = {
    className: null,
    status: null,
  };

  render() {
    const { className, status } = this.props;

    return (
      <>
        {status === 'complete' && (
          <Checkmark
            width="14"
            height="14"
            viewBox="0 0 14 15"
            className={cn(styles.checkmark, className)}
          />
        )}
        {status === 'required' && (
          <I
            width="14"
            height="14"
            viewBox="0 0 12 12"
            className={cn(styles.warning, className)}
          />
        )}
      </>
    );
  }
}
