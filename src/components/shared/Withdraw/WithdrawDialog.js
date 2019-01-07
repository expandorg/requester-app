import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import WithdrawForm, { WithdrawEffect } from './WithdrawForm';
import TxForm from '../TxForm';

import dstyles from '../../common/dialog.module.styl';

export default class WithdrawDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  state = {
    complete: null,
  };

  handleComplete = response => {
    this.setState({ complete: response.payload });
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
        contentLabel="withdraw-dialog"
        hideButton
      >
        {!complete && <WithdrawForm {...this.props} />}
        {complete && (
          <TxForm
            title="Success! Your Gems have been withdrawn."
            tx={complete.user.pendingTx.hash}
            onHide={onHide}
          />
        )}
        <WithdrawEffect onComplete={this.handleComplete} />
      </Dialog>
    );
  }
}
