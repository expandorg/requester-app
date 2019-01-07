import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';

import ConfirmEmailForm from './ConfirmEmailForm';
import ConfirmEmailComplete from './ConfirmEmailComplete';

import { ConfirmEmailEffect } from './stateEffects';

import dstyles from '../../common/dialog.module.styl';

export default class ConfirmEmailDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  state = {
    complete: false,
  };

  handleComplete = () => {
    this.setState({ complete: true });
  };

  render() {
    const { onHide } = this.props;
    const { complete } = this.state;

    return (
      <Dialog
        visible
        onHide={onHide}
        overlayClass={dstyles.overlay}
        modalClass={dstyles.modal}
        contentLabel="confirm-email-dialog"
        hideButton
      >
        {!complete && <ConfirmEmailForm {...this.props} />}
        {complete && <ConfirmEmailComplete {...this.props} />}
        <ConfirmEmailEffect onComplete={this.handleComplete} />
      </Dialog>
    );
  }
}
