import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { Dialog } from '@gemsorg/components';

import FormEditor from './FormEditor';

import styles from './FormEditorDialog.module.styl';

export default class FormEditorDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide, ...rest } = this.props;

    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Dialog
          visible
          onHide={onHide}
          modalClass={styles.modal}
          overlayClass={styles.overlay}
          contentLabel="form-editor-dialog"
          hideButton
          shouldCloseOnEsc={false}
        >
          <FormEditor onHide={onHide} {...rest} />
        </Dialog>
      </DragDropContextProvider>
    );
  }
}
