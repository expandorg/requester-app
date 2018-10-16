import React, { Component } from 'react';

import immer from 'immer';

import Form from './Form/Form';
import AvailableModules from './Available/AvailableModules';
import Properties from './Properties/Properties';
import Info from './Info';

import styles from './FormEditor.module.styl';

const scaffold = (meta, name, isDragging) => ({
  ...meta.editor.defaults,
  type: meta.type,
  name,
  isDragging,
});

export const insertAtIndex = (array, index, item) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export default class FormEditor extends Component {
  state = {
    modules: [],
    selected: null,
  };

  handleAdd = (dragId, meta) => {
    const { modules } = this.state;
    this.setState({
      modules: [...modules, scaffold(meta, dragId)],
    });
  };

  handleRemove = id => {
    this.setState(({ modules }) => ({
      modules: modules.filter(m => m.name !== id),
      selected: null,
    }));
  };

  handleSelect = module => {
    const { selected } = this.state;
    this.setState({ selected: selected === module.name ? null : module.name });
  };

  handleSave = () => {};

  handleMove = (dragId, hoverId, meta) => {
    const { modules } = this.state;

    const dragIndex = modules.findIndex(m => m.name === dragId);
    const hoverIndex = modules.findIndex(m => m.name === hoverId);

    if (dragIndex === -1) {
      this.setState({
        modules: insertAtIndex(
          modules,
          hoverIndex,
          scaffold(meta, dragId, true)
        ),
      });
    } else {
      const dragged = modules[dragIndex];
      const hovered = modules[hoverIndex];

      this.setState({
        modules: immer(modules, draft => {
          draft[dragIndex] = hovered;
          draft[hoverIndex] = dragged;
        }),
      });
    }
  };

  handleEndDrag = dragId => {
    const { modules } = this.state;
    this.setState({
      modules: immer(modules, draft => {
        const module = draft.find(m => m.name === dragId);
        if (module) {
          module.isDragging = undefined;
        }
      }),
    });
  };

  handleSave = () => {};
  handleTogglePreview = () => {};
  handleCancel = () => {};

  render() {
    const { modules, selected } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AvailableModules
            totalModules={modules.length}
            onEndDrag={this.handleEndDrag}
            onAddModule={this.handleAdd}
            onRemoveModule={this.handleRemove}
          />
        </div>
        <div className={styles.form}>
          <Form
            modules={modules}
            onAddModule={this.handleAdd}
            onMoveModule={this.handleMove}
            onSelectModule={this.handleSelect}
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
          onCancel={this.handleSelect}
          onRemove={this.handleRemove}
          onSave={this.handleSave}
        />
      </div>
    );
  }
}
