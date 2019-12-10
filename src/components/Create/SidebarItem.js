import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@expandorg/components';

import { ReactComponent as Checkmark } from '../../assets/check_circle.svg';
import { taskTemplateProps } from '../shared/propTypes';

import styles from './SidebarItem.module.styl';

function SidebarItem({ children, template, selected, onSelect, ...rest }) {
  const click = useCallback(
    evt => {
      evt.preventDefault();
      onSelect(template.id);
    },
    [onSelect, template.id]
  );

  return (
    <button
      className={cn(styles.container, { [styles.selected]: selected })}
      onClick={click}
      {...rest}
    >
      <div className={styles.name}>{template.name}</div>
      {selected && (
        <Checkmark
          className={styles.checkmark}
          width="15"
          height="15"
          viewBox="0 0 20 20"
        />
      )}
      {children}
    </button>
  );
}

SidebarItem.propTypes = {
  template: taskTemplateProps.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Tooltip(SidebarItem);
