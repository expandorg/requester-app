import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps, Module } from '@expandorg/modules';

// eslint-disable-next-line import/no-cycle
import Nested from './Nested';
import Outer from './Preview/Outer';
import Header from './Preview/Header';
import Sidepanel from './Preview/Sidepanel';
import NotSupported from './Preview/NotSupported';
import ModuleWrapper from './Preview/ModuleWrapper';

import { supportNesting } from '../modules';
import { treeEditor } from '../Tree';

import styles from './Preview.module.styl';

const isVisibilityAllowed = module => module.type !== 'submit';
const isCopyAllowed = module => module.type !== 'submit';
const getModulesHeader = meta => meta.editor.properties.modules.caption;

export default class Preview extends Component {
  static propTypes = {
    module: moduleProps.isRequired,
    path: PropTypes.arrayOf(PropTypes.number).isRequired,
    controls: PropTypes.object.isRequired, // eslint-disable-line
    selection: PropTypes.string,

    onMove: PropTypes.func.isRequired, // eslint-disable-line
    onSelect: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCopy: PropTypes.func.isRequired,
    onEndDrag: PropTypes.func.isRequired,

    connectDragPreview: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selection: null,
  };

  handleSelect = () => {
    const { onSelect, path } = this.props;
    onSelect(path, 'edit');
  };

  handleSelectLogic = () => {
    const { onSelect, path } = this.props;
    onSelect(path, 'logic');
  };

  handleRemove = () => {
    const { onRemove, path } = this.props;
    onRemove(path);
  };

  handleCopy = () => {
    const { module, path, onCopy } = this.props;
    onCopy(path, module);
  };

  render() {
    const {
      connectDragPreview,
      module,
      selection,
      controls,
      path,
      onMove,
      onRemove,
      onCopy,
      onSelect,
      onEndDrag,
    } = this.props;

    const ControlType = controls[module.type];
    if (!ControlType) {
      return <NotSupported type={module.type} onRemove={this.handleRemove} />;
    }

    const isSelected = treeEditor.getIdByPath(path) === selection;
    return (
      <Outer>
        {connectDragPreview(
          <div
            className={cn(styles.container, { [styles.selected]: isSelected })}
          >
            <Header module={module} onSelect={this.handleSelect} />
            <ModuleWrapper
              isSelected={isSelected}
              selection={selection}
              module={module}
              onSelect={this.handleSelect}
            >
              {({ values, onChange, module: preview }) => (
                <Module
                  isModulePreview
                  isSubmitting={false}
                  module={preview}
                  controls={controls}
                  values={values}
                  onChange={onChange}
                />
              )}
            </ModuleWrapper>
            {supportNesting(ControlType.module) && (
              <Nested
                title={getModulesHeader(ControlType.module)}
                modules={module.modules}
                path={path}
                controls={controls}
                selection={selection}
                onMove={onMove}
                onSelect={onSelect}
                onRemove={onRemove}
                onEndDrag={onEndDrag}
                onCopy={onCopy}
              />
            )}
          </div>
        )}
        <Sidepanel
          nested={path.length > 1}
          canCopy={isCopyAllowed(module)}
          canApplyLogic={isVisibilityAllowed(module)}
          onRemove={this.handleRemove}
          onCopy={this.handleCopy}
          onLogic={this.handleSelectLogic}
        />
      </Outer>
    );
  }
}
