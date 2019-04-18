import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@expandorg/modules';

import Nested from './Nested';
import Outer from './Preview/Outer';
import Header from './Preview/Header';
import Sidepanel from './Preview/Sidepanel';
import NotSupported from './Preview/NotSupported';

import { supportNesting } from '../../model/modules';
import { treeEditor } from '../../model/dnd';

import styles from './Preview.module.styl';

const isVisibilityAllowed = module => module.type !== 'submit';

export default class Preview extends Component {
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
    onSelect(path, 'edit');
    evt.preventDefault();
  };

  handleSelectLogic = evt => {
    const { onSelect, path } = this.props;
    onSelect(path, 'logic');

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
            <Header module={module} onSelect={this.handleSelect} />
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
              <Nested
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
          nested={path.length > 1}
          canCopy={canCopy}
          onRemove={this.handleRemove}
          onCopy={this.handleCopyClick}
          canApplyLogic={isVisibilityAllowed(module)}
          onLogic={this.handleSelectLogic}
        />
      </Outer>
    );
  }
}
