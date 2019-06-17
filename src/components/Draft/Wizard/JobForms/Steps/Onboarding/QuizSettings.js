import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import styles from './QuizSettings.module.styl';

export default function QuizSettings({ onHide, visible }) {
  return (
    <Dialog
      visible={visible}
      modalClass={styles.modal}
      contentLabel="verification-dialog"
      onHide={onHide}
    >
      <h1>quiz settings</h1>
    </Dialog>
  );
}

QuizSettings.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
