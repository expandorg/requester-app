import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import immer from 'immer';

import Step from './Step';
import AddNew from './AddNew';

import styles from './StepsForm.module.styl';

export default class StepsForm extends Component {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
    steps: [],
  };

  handleAdd = template => {
    const { onUpdate, steps } = this.props;
    const step = { ...template, modules: [], checked: false, id: steps.length };
    onUpdate([step, ...steps]);
  };

  handleDelete = stepId => {
    const { onUpdate, steps } = this.props;
    onUpdate(steps.filter(s => s.id !== stepId));
  };

  handleMove = (dragId, hoverId) => {
    const { onUpdate, steps } = this.props;

    const dragIndex = steps.findIndex(m => m.id === dragId);
    const hoverIndex = steps.findIndex(m => m.id === hoverId);

    const dragged = steps[dragIndex];
    const hovered = steps[hoverIndex];
    onUpdate(
      immer(steps, draft => {
        draft[dragIndex] = hovered;
        draft[hoverIndex] = dragged;
      })
    );
  };

  render() {
    const { steps, onSelect, className } = this.props;
    const last = steps.length - 1;
    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.list}>
          <AddNew onAdd={this.handleAdd} />
          {steps.map((step, order) => (
            <Step
              key={step.id}
              step={step}
              isTask={order === last}
              order={order}
              onSelect={onSelect}
              onMove={this.handleMove}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}
