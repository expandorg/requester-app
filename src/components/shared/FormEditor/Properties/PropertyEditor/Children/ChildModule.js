import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useDrag, useDrop } from 'react-dnd';

import { moduleProps } from '@expandorg/modules';

import miniIcon from '../../../icons/miniIcon';

import { source, target } from './dnd';

import styles from './ChildModule.module.styl';

export default function ChildModule({ module, index, onDrag, onEndDrag }) {
  const ref = useRef(null);

  const [, drag] = useDrag(source(index, onEndDrag));
  const [, drop] = useDrop(target(ref, index, onDrag));

  return (
    <div className={cn(styles.child)} ref={drag(drop(ref))}>
      <div className={cn(styles.miniIcon, miniIcon(module.type))} />
      <div className={styles.name}>{module.name}</div>
    </div>
  );
}

ChildModule.propTypes = {
  index: PropTypes.number.isRequired,
  module: moduleProps.isRequired,
  onDrag: PropTypes.func.isRequired,
  onEndDrag: PropTypes.func.isRequired,
};
