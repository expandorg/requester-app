import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';

import FormEditor from './FormEditor';

import styles from './FormEditorDialog.module.styl';

export default class FormEditorDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func,
  };

  static defaultProps = {
    onHide: Function.prototype,
  };

  render() {
    const { onHide } = this.props;

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        overlayClass={styles.overlay}
        contentLabel="test"
        hideButton
        shouldCloseOnEsc={false}
      >
        <FormEditor />
      </Dialog>
    );
  }
}
