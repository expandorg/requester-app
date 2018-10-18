import React, { Component } from 'react';

import immer from 'immer';

import { moduleControls } from '@gemsorg/modules';

import Editor from './Editor/Editor';
import AvailableModules from './Available/AvailableModules';

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
    }));
  };

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

  handleEditModule = () => {};

  render() {
    const { modules } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AvailableModules
            totalModules={modules.length}
            moduleControls={moduleControls}
            onEndDrag={this.handleEndDrag}
            onAddModule={this.handleAdd}
            onRemoveModule={this.handleRemove}
          />
        </div>
        <div className={styles.editor}>
          <Editor
            modules={modules}
            moduleControls={moduleControls}
            onAddModule={this.handleAdd}
            onEditModule={this.handleEditModule}
            onMoveModule={this.handleMove}
            onRemoveModule={this.handleRemove}
          />
        </div>
      </div>
    );
  }
}
