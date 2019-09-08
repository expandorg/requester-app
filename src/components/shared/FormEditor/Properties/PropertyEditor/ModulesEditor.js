import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import miniIcon from '../../icons/miniIcon';

import styles from './ModulesEditor.module.styl';

function ChildModule({ module }) {
  return (
    <div className={cn(styles.child)}>
      <div className={cn(styles.miniIcon, miniIcon(module.type))} />
      <div className={styles.name}>{module.name}</div>
    </div>
  );
}

ChildModule.propTypes = {
  module: moduleProps.isRequired,
};

export default function ModulesEditor({ value }) {
  if (!value) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nested components</div>
      <div className={styles.list}>
        {value.map(v => (
          <ChildModule key={v.name} module={v} />
        ))}
      </div>
    </div>
  );
}

ModulesEditor.propTypes = {
  value: PropTypes.arrayOf(moduleProps),
};

ModulesEditor.defaultProps = {
  value: [],
};
