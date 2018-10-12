import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

import Empty from './Empty';
import DnDModule from './Module/DnDModule';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
    invisibleIndex: PropTypes.number,
    onAddModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
  };

  static defaultProps = {
    modules: [],
    invisibleIndex: null,
  };

  render() {
    const { modules, onMoveModule, onAddModule, invisibleIndex } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>Task Module</div>
        <div className={styles.content}>
          {modules.length === 0 && <Empty onAdd={onAddModule} />}
          <div className={styles.list}>
            {modules.map((module, ix) => (
              <DnDModule
                key={module.name}
                index={ix}
                invisible={ix === invisibleIndex}
                module={module}
                onMove={onMoveModule}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
