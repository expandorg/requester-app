import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import Button from '../common/Button';

import { ReactComponent as Warning } from '../assets/warning.svg';

import styles from './ConfirmationDialog.module.styl';

export default class ConfirmationDialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    confirmation: PropTypes.string.isRequired,
    confirmCaption: PropTypes.string,
    hideCaption: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    confirmCaption: 'Yes, continue',
    hideCaption: 'No, go back',
  };

  render() {
    const {
      title,
      confirmation,
      confirmCaption,
      hideCaption,
      onHide,
      onConfirm,
    } = this.props;
    return (
      <Dialog
        visible
        onHide={onHide}
        overlayClass={styles.overlay}
        modalClass={styles.modal}
        contentLabel="confirm-dialog"
      >
        <div className={styles.container}>
          <div className={styles.icon}>
            <Warning width={64} height={64} viewBox="0 0 42 42" />
          </div>
          <div className={styles.title}>{title}</div>
          <div className={styles.confirmation}>{confirmation}</div>
          <div className={styles.actions}>
            <Button className={styles.button} onClick={onConfirm}>
              {confirmCaption}
            </Button>
            <Button className={styles.button} theme="grey" onClick={onHide}>
              {hideCaption}
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
