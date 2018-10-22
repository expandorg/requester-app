import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    );
  }
}
