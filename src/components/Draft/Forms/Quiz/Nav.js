import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { WizardSteps } from './wizard';

import styles from './Nav.module.styl';

export default function Nav({ active, onChangeStep }) {
  const onData = useCallback(() => onChangeStep(WizardSteps.Data), [
    onChangeStep,
  ]);

  const onSettings = useCallback(() => onChangeStep(WizardSteps.Settings), [
    onChangeStep,
  ]);

  const dataClasses = cn(styles.navItem, {
    [styles.active]: active === WizardSteps.Data,
  });
  const settingsClasses = cn(styles.navItem, {
    [styles.active]: active === WizardSteps.Settings,
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}></div>
      {active && (
        <div className={styles.nav}>
          <button onClick={onData} className={dataClasses}>
            Data
          </button>
          <button onClick={onSettings} className={settingsClasses}>
            Settings
          </button>
        </div>
      )}
    </div>
  );
}

Nav.propTypes = {
  active: PropTypes.string,
  onChangeStep: PropTypes.func,
};

Nav.defaultProps = {
  active: null,
  onChangeStep: Function.prototype,
};
