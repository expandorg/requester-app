import React from 'react';
import PropTypes from 'prop-types';

import { taskTemplateProps } from '../shared/propTypes';

import SidebarItem from './SidebarItem';

import styles from './Sidebar.module.styl';

export default function Sidebar({ templates, selected, onSelect }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.title}>Task Templates</div>
      <div className={styles.list}>
        <div className={styles.inner}>
          {templates.map(template => (
            <SidebarItem
              key={template.id}
              template={template}
              selected={template.id === selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  templates: PropTypes.arrayOf(taskTemplateProps),

  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  templates: [],
  selected: null,
};
