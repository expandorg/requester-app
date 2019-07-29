import React from 'react';
import PropTypes from 'prop-types';

import Rule from './Rule';

import styles from './Validation.module.styl';

export default function Validation({ rules, validation, onChange }) {
  if (!rules) {
    return null;
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>Validation Settings</div>
      <div className={styles.rules}>
        {Reflect.ownKeys(rules).map(name => (
          <Rule
            key={name}
            name={name}
            validation={validation}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

Validation.propTypes = {
  validation: PropTypes.object, // eslint-disable-line
  rules: PropTypes.object, // eslint-disable-line
  onChange: PropTypes.func.isRequired,
};

Validation.defaultProps = {
  validation: null,
  rules: null,
};
