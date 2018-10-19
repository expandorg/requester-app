import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps, getModuleControlsMap } from '@gemsorg/modules';

import Button from '../../../common/Button';

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
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
    controls: getModuleControlsMap(this.props.moduleControls),
  };

  handleSelect = module => {
    const { selected } = this.state;
    this.setState({ selected: selected === module.name ? null : module.name });
  };

  handleTogglePreview = () => {};

  handleRemoveModule = id => {
    const { onRemoveModule } = this.props;
    const { selected } = this.state;

    if (id === selected) {
      this.setState({ selected: null });
    }
    onRemoveModule(id);
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
        <div className={styles.header}>
          <div className={styles.title}>Edit Task Module</div>
          <Button
            theme="aqua"
            className={styles.preview}
            onClick={this.handleTogglePreview}
          >
            Preview
          </Button>
        </div>
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
          <div className={styles.aside}>
            <Info onSave={onSave} onCancel={onCancel} />
          </div>
        </div>
        <Properties
          module={selected && modules.find(m => m.name === selected)}
          controls={controls}
          onCancel={this.handleSelect}
          onEdit={this.handleEditModule}
        />
      </div>
    );
  }
}
