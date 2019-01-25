import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { WizardSteps } from './wizard';

import styles from './Header.module.styl';

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    active: PropTypes.string,
    onChangeStep: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: null,
  };

  render() {
    const { title, active, onChangeStep } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        {active && (
          <div className={styles.nav}>
            <button
              onClick={() => onChangeStep(WizardSteps.Data)}
              className={cn(styles.navItem, {
                [styles.active]: active === WizardSteps.Data,
              })}
            >
              Data
            </button>
            <button
              onClick={() => onChangeStep(WizardSteps.Quiz)}
              className={cn(styles.navItem, {
                [styles.active]: active === WizardSteps.Quiz,
              })}
            >
              Quiz
            </button>
          </div>
        )}
      </div>
    );
  }
}
