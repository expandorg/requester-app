import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import { draftProps } from '../../../../../shared/propTypes';

import styles from './Settings.module.styl';

export default function VerificationSettings({ onHide, draft }) {
  console.log(draft);

  return (
    <Dialog
      visible
      modalClass={styles.modal}
      contentLabel="verification-dialog"
      onHide={onHide}
    >
      <h1>title</h1>
    </Dialog>
  );
}

VerificationSettings.propTypes = {
  draft: draftProps.isRequired,
  onHide: PropTypes.func.isRequired,
};
