import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import Button from '../../../../common/Button';

import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import styles from './ConfirmationDialog.module.styl';

export default class ConfirmationDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  handleDelete = evt => {
    const { onDelete } = this.props;
    onDelete();

    evt.preventDefault();
  };

  handleHide = evt => {
    const { onHide } = this.props;
    onHide();

    evt.preventDefault();
  };

  render() {
    const { onHide } = this.props;

    return (
      <Dialog
        visible
        onHide={onHide}
        overlayClass={styles.overlay}
        modalClass={styles.modal}
        contentLabel="delete-confirm-dialog"
      >
        <div className={styles.container}>
          <div className={styles.icon}>
            <Warning width={64} height={64} viewBox="0 0 42 42" />
          </div>
          <div className={styles.title}>You are about to remove your data.</div>
          <div className={styles.confirmation}>
            Are you sure you want to continue?
          </div>
          <div className={styles.actions}>
            <Button className={styles.button} onClick={this.handleDelete}>
              Yes, continue
            </Button>
            <Button
              className={styles.button}
              theme="grey"
              onClick={this.handleHide}
            >
              No, go back
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }
}
