import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { WizardSteps } from './wizard';

import styles from './Nav.module.styl';

export default class Nav extends Component {
  static propTypes = {
    active: PropTypes.string,
    onChangeStep: PropTypes.func,
  };

  static defaultProps = {
    active: null,
    onChangeStep: Function.prototype,
  };

  render() {
    const { active, onChangeStep } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}></div>
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
              onClick={() => onChangeStep(WizardSteps.Settings)}
              className={cn(styles.navItem, {
                [styles.active]: active === WizardSteps.Settings,
              })}
            >
              Settings
            </button>
          </div>
        )}
      </div>
    );
  }
}
