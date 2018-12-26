import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import Button from '../common/Button';

import { ReactComponent as Warning } from '../assets/warning.svg';
import { ReactComponent as Checkmark } from '../assets/checkmark-3.svg';
import { ReactComponent as Eye } from '../assets/eye.svg';

import styles from './ConfirmationDialog.module.styl';
import dstyles from '../common/dialog.module.styl';

export default class ConfirmationDialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.oneOf(['warning', 'success', 'review', 'none']),
    confirmation: PropTypes.string.isRequired,
    confirmCaption: PropTypes.string,
    hideCaption: PropTypes.string,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    confirmCaption: 'Yes, continue',
    hideCaption: 'No, go back',
    icon: 'warning',
  };

  renderIcon(icon) {
    switch (icon) {
      case 'warning':
        return (
          <Warning
            className={styles.warning}
            width={64}
            height={64}
            viewBox="0 0 42 42"
          />
        );
      case 'success':
        return (
          <Checkmark
            className={styles.success}
            width={64}
            height={48}
            viewBox="0 0 64 48"
          />
        );
      case 'review':
        return <Eye className={styles.eye} />;
      default:
        break;
    }
    return null;
  }

  render() {
    const {
      title,
      confirmation,
      confirmCaption,
      hideCaption,
      icon,
      onHide,
      onConfirm,
    } = this.props;
    return (
      <Dialog
        visible
        onHide={onHide}
        overlayClass={dstyles.overlay}
        modalClass={dstyles.modal}
        contentLabel="confirm-dialog"
      >
        <div className={styles.container}>
          <div className={styles.icon}>{this.renderIcon(icon)}</div>
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
