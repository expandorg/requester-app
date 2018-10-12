import React, { Component } from 'react';

import { removeAtIndex } from '@gemsorg/utils';

import AvailableModules from './Available/AvailableModules';

import Form from './Form/Form';

import styles from './FormEditor.module.styl';

export const insertAtIndex = (array, index, item) => [
  ...array.slice(0, index),
  item,
  ...array.slice(index),
];

export default class FormEditor extends Component {
  state = {
    modules: [],
    invisibleIndex: null,
  };

  handleAdd = ({ module }) => {
    const { modules } = this.state;
    this.setState({
      modules: [...modules, module],
    });
  };

  handleMove = (dragModule, dragIndex, hoverIndex, finish = false) => {
    if (finish) {
      this.setState({ invisibleIndex: null });
    } else {
      let { modules } = this.state;
      if (dragIndex) {
        modules = removeAtIndex(modules, dragIndex);
      }
      modules = insertAtIndex(modules, hoverIndex, dragModule);
      this.setState({ modules, invisibleIndex: hoverIndex });
    }
  };

  render() {
    const { modules, invisibleIndex } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <AvailableModules onMoveModule={this.handleMove} />
        </div>
        <div className={styles.form}>
          <Form
            invisibleIndex={invisibleIndex}
            modules={modules}
            onAddModule={this.handleAdd}
            onMoveModule={this.handleMove}
          />
        </div>
      </div>
    );
  }
}
