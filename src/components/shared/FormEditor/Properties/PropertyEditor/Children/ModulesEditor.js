import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { useSyncedState } from '@expandorg/components';
import { moduleProps } from '@expandorg/modules';

import ChildModule from './ChildModule';

import { dndReplace } from '../../../../../../common/utils';

import styles from './ModulesEditor.module.styl';

export default function ModulesEditor({ value, onChange }) {
  const [modules, setModules] = useSyncedState(value);

  const drag = useCallback(
    (dragIx, hoverIx) => {
      setModules(dndReplace(modules, dragIx, hoverIx));
    },
    [modules, setModules]
  );

  const endDrag = useCallback(() => {
    onChange(modules);
  }, [modules, onChange]);

  if (!modules) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Nested components</div>
      <div className={styles.list}>
        {modules.map((module, index) => (
          <ChildModule
            key={module.name}
            module={module}
            index={index}
            onDrag={drag}
            onEndDrag={endDrag}
          />
        ))}
      </div>
    </div>
  );
}

ModulesEditor.propTypes = {
  value: PropTypes.arrayOf(moduleProps),
  onChange: PropTypes.func.isRequired,
};

ModulesEditor.defaultProps = {
  value: [],
};
