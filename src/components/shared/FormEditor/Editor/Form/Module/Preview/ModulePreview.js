import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@expandorg/modules';

import NestedModules from '../NestedModules';
import Outer from './Outer';
import Header from './Header';
import Sidepanel from './Sidepanel';
import NotSupported from './NotSupported';

import { supportNesting } from '../../../../model/modules';
import { treeEditor } from '../../../../model/dnd';

import styles from './ModulePreview.module.styl';

export default class ModulePreview extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    selected: PropTypes.string,
    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,

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

  handleRemove = evt => {
    const { onRemove, path } = this.props;
    onRemove(path);
    evt.preventDefault();
  };

  handleCopyClick = evt => {
    const { module, path, onCopy } = this.props;
    onCopy(path, module);
    evt.preventDefault();
  };

  handleToggleLogic = evt => {
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
      onCopy,
      onSelect,
    } = this.props;

    const ControlType = controls[module.type];
    if (!ControlType) {
      return <NotSupported type={module.type} onRemove={this.handleRemove} />;
    }

    const { module: meta } = ControlType;

    const isSelected = treeEditor.getIdByPath(path) === selected;

    const canCopy = module.type !== 'submit';

    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <Outer>
        {connectDragPreview(
          <div
            className={cn(styles.container, {
              [styles.selected]: isSelected,
            })}
          >
            <Header
              module={module}
              onSelect={this.handleSelect}
              onToggleLogic={this.handleToggleLogic}
            />
            <div
              className={cn(styles.inner, {
                [styles.dimmed]: selected !== null && !isSelected,
              })}
            >
              <Module
                isFormBuilder
                isSubmitting={false}
                value={module.initial || undefined}
                module={module}
                controls={controls}
              />
              <div className={styles.edit} onClick={this.handleSelect} />
            </div>
            {supportNesting(meta) && (
              <NestedModules
                caption={meta.editor.properties.modules.caption}
                modules={module.modules}
                path={path}
                controls={controls}
                selected={selected}
                onMove={onMove}
                onSelect={onSelect}
                onRemove={onRemove}
                onCopy={onCopy}
              />
            )}
          </div>
        )}
        <Sidepanel
          canCopy={canCopy}
          onRemove={this.handleRemove}
          onCopy={this.handleCopyClick}
        />
      </Outer>
    );
  }
}
