import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Checkmark } from '../../assets/checkmark-2.svg';
import { ReactComponent as Warning } from '../../assets/warning.svg';

import styles from './Step.module.styl';

export default class Step extends Component {
  static propTypes = {
    step: PropTypes.object.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
  };

  handleClick = evt => {
    evt.preventDefault();
    const { step, onSelect } = this.props;
    onSelect(step.id);
  };

  render() {
    const { step } = this.props;

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */

    return (
      <div className={styles.container} onClick={this.handleClick}>
        <div className={styles.name}>{step.name}</div>
        <div className={cn(styles.icon, { [styles.checked]: step.checked })}>
          {step.checked ? <Checkmark /> : <Warning />}
        </div>
      </div>
    );
  }
}
