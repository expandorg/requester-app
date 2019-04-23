import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import styles from './SelectedRowDialog.module.styl';

export default class OnboardingGroupDialog extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(['json', 'table']).isRequired,
    onHide: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode,
    };
  }

  render() {
    const { onHide } = this.props;
    const { mode } = this.state;

    console.log(mode);

    return (
      <Dialog
        visible
        onHide={onHide}
        modalClass={styles.modal}
        contentLabel="selected-row-dialog"
      />
    );
  }
}
