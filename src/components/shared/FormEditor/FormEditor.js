import React, { Component } from 'react';

import immer from 'immer';

import AvailableModules from './Available/AvailableModules';

import Form from './Form/Form';

import styles from './FormEditor.module.styl';

export default class FormEditor extends Component {
  state = {
    modules: [
      {
        type: 'text',
        placeholder: 'Test',
        name: 'input-1',
      },
      {
        type: 'email',
        placeholder: 'email',
        name: 'input-2',
      },
      {
        type: 'paragraph',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et',
        name: 'input-3',
      },
    ],
  };

  handleAdd = ({ module }) => {
    const { modules } = this.state;
    this.setState({
      modules: [...modules, module],
    });
  };

  handleMove = (dragId, hoverId) => {
    const { modules } = this.state;

    const dragIndex = modules.findIndex(m => m.name === dragId);
    const hoverIndex = modules.findIndex(m => m.name === hoverId);
    const dragged = modules[dragIndex];
    const hovered = modules[hoverIndex];

    this.setState({
      modules: immer(modules, draft => {
        draft[dragIndex] = hovered;
        draft[hoverIndex] = dragged;
      }),
    });
  };

  render() {
    const { modules } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AvailableModules />
        </div>
        <div className={styles.form}>
          <Form
            modules={modules}
            onAddModule={this.handleAdd}
            onMoveModule={this.handleMove}
          />
        </div>
      </div>
    );
  }
}
