import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import { draftOnboardingStepProps } from '../../../../../shared/propTypes';

import styles from './EditOnboardingGroupDialog.module.styl';

export default class EditOnboardingGroupDialog extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide, onUpdate, group } = this.props;
    console.log(onUpdate, group);

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        contentLabel="edit-onboarding-group-dialog"
        hideButton
        shouldCloseOnEsc={false}
      >
        {/* <FormEditor onHide={onHide} {...rest} /> */}
      </Dialog>
    );
  }
}
