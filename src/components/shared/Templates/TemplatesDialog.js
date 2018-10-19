import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Dialog } from '@gemsorg/components';

import Templates from './Templates';

import templateProps from './templateProps';

import styles from './TemplatesDialog.module.styl';

export default class TemplatesDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func,
    templates: PropTypes.arrayOf(templateProps),
  };

  static defaultProps = {
    onHide: Function.prototype,
    templates: [],
  };

  state = {
    selected: null,
  };

  handleSelect = id => {
    this.setState({ selected: id });
  };

  render() {
    const { onHide, templates, ...rest } = this.props;
    const { selected } = this.state;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Dialog
          visible
          onHide={onHide}
          modalClass={styles.modal}
          overlayClass={styles.overlay}
          contentLabel="templates-dialog"
          hideButton
          shouldCloseOnEsc={false}
        >
          <Templates
            className={styles.content}
            templates={templates}
            selected={selected}
            onSelect={this.handleSelect}
            {...rest}
          />
        </Dialog>
      </DragDropContextProvider>
    );
  }
}
