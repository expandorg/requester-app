import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps, getModuleControlsMap } from '@gemsorg/modules';

import Form from './Form/Form';
import Properties from './Properties/Properties';
import Info from './Info';

import styles from './Editor.module.styl';

export default class Editor extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    moduleControls: PropTypes.arrayOf(PropTypes.func).isRequired,
    onAddModule: PropTypes.func.isRequired,
    onEditModule: PropTypes.func.isRequired,
    onMoveModule: PropTypes.func.isRequired,
    onRemoveModule: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
    controls: getModuleControlsMap(this.props.moduleControls),
  };

  handleSelect = module => {
    const { selected } = this.state;
    this.setState({ selected: selected === module.name ? null : module.name });
  };

  handleSave = () => {};
  handleTogglePreview = () => {};
  handleCancel = () => {};

  handleSaveModule = () => {};

  handleRemoveModule = id => {
    const { onRemoveModule } = this.props;
    const { selected } = this.state;

    if (id === selected) {
      this.setState({ selected: null });
    }
    onRemoveModule(id);
  };

  render() {
    const { modules, onMoveModule, onEditModule, onAddModule } = this.props;
    const { controls, selected } = this.state;

    return (
      <div className={styles.container}>
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
        <div className={styles.aside}>
          <Info
            onSave={this.handleSave}
            onPreview={this.handleTogglePreview}
            onCancel={this.handleCancel}
          />
        </div>
        <Properties
          module={modules.find(m => m.name === selected)}
          controls={controls}
          onCancel={this.handleSelect}
          onSave={onEditModule}
        />
      </div>
    );
  }
}
