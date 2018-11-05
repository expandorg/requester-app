import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@gemsorg/modules';
import { ReactComponent as X } from '../../../../../assets/x.svg';

import NestedModules from './NestedModules';

import { supportNesting } from '../../../modules';
import { treeEditor } from '../../../tree';

import styles from './DnDModule.module.styl';

export default class ModulePreview extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    selected: PropTypes.string,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,

    connectDragPreview: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
  };

  handleSelect = evt => {
    const { onSelect, path } = this.props;
    onSelect(path);

    evt.preventDefault();
  };

  handleRemoveClick = evt => {
    const { onRemove, path } = this.props;
    onRemove(path);
    evt.preventDefault();
  };

  render() {
    const {
      connectDragPreview,
      module,
      selected,
      controls,
      path,
      onMove,
      onRemove,
      onSelect,
    } = this.props;

    const { module: meta } = controls[module.type];
    const isSelected = treeEditor.getIdByPath(path) === selected;

    const containerClasses = cn(styles.container, {
      [styles.selected]: isSelected,
    });

    const innerClasses = cn(styles.inner, {
      [styles.dimmed]: selected !== null && !isSelected,
    });

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div className={styles.outer}>
        {connectDragPreview(
          <div className={containerClasses}>
            <div className={innerClasses}>
              <Module
                isSubmitting={false}
                module={module}
                controls={controls}
              />
              <div className={styles.edit} onClick={this.handleSelect} />
            </div>
            {supportNesting(meta) && (
              <NestedModules
                modules={module.modules}
                path={path}
                controls={controls}
                selected={selected}
                onMove={onMove}
                onSelect={onSelect}
                onRemove={onRemove}
              />
            )}
          </div>
        )}
        <button className={styles.remove} onClick={this.handleRemoveClick}>
          <X />
        </button>
      </div>
    );
  }
}
