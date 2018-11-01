import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps, getModuleControlsMap } from '@gemsorg/modules';

import Button from '../../../common/Button';

import Form from './Form/Form';
import Properties from './Properties/Properties';
import PreviewCtx from './PreviewCtx';

import styles from './Editor.module.styl';

const getByPath = (path, modules) => {
  let result = null;
  if (path) {
    let p = path;
    let mods = modules;
    while (p.length) {
      const [index, ...rest] = p;
      result = mods[index];
      mods = result.modules;
      p = rest;
    }
  }
  return result;
};

export default class Editor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    onAddModule: PropTypes.func.isRequired,
    onEditModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
    controls: getModuleControlsMap(this.props.moduleControls),
  };

  handleSelect = path => {
    const { selected } = this.state;
    this.setState({ selected: selected === path ? null : path });
  };

  handleRemoveModule = order => {
    const { onRemoveModule } = this.props;
    const { selected } = this.state;

    if (order === selected) {
      this.setState({ selected: null });
    }
    onRemoveModule(order);
  };

  handleEditModule = module => {
    const { onEditModule } = this.props;
    const { selected } = this.state;

    onEditModule(selected, module);
    this.setState({ selected: null });
  };

  render() {
    const { modules, onMoveModule, onAddModule, onSave, onCancel } = this.props;
    const { controls, selected } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.form}>
            <Form
              modules={modules}
              selected={selected}
              controls={controls}
              onAddModule={onAddModule}
              onMoveModule={onMoveModule}
              onSelectModule={this.handleSelect}
              onRemoveModule={this.handleRemoveModule}
            />
          </div>
        </div>
        <div className={styles.actions}>
          <div>
            <PreviewCtx modules={modules}>
              {({ onPreview }) => (
                <Button theme="aqua" className={styles.btn} onClick={onPreview}>
                  Preview
                </Button>
              )}
            </PreviewCtx>
          </div>
          <div className={styles.title}>Edit Task Module</div>
          <div>
            <Button theme="grey" className={styles.btn} onClick={onCancel}>
              Cancel
            </Button>
            <Button className={styles.btn} onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
        <Properties
          module={selected && getByPath(selected, modules)}
          controls={controls}
          onCancel={this.handleSelect}
          onEdit={this.handleEditModule}
        />
      </div>
    );
  }
}
