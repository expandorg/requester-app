import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import styles from './StepsForm.module.styl';

import Step from './Step';
import AddNew from './AddNew';

export default class StepsForm extends Component {
  static propTypes = {
    steps: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
    steps: [],
  };

  render() {
    const { onAdd, steps, onSelect, className } = this.props;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={cn(styles.container, className)}>
          <div className={styles.list}>
            <AddNew onAdd={onAdd} />
            {steps.map(step => (
              <Step step={step} key={step.id} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}
