import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';
import DepositForm, { DepositEffect } from './DepositForm';
import TxForm from '../TxForm';

import dstyles from '../../common/dialog.module.styl';

export default class DepositDialog extends Component {
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
        contentLabel="deposit-dialog"
        hideButton
      >
        {!complete && <DepositForm {...this.props} />}
        {complete && (
          <TxForm
            title="Success! Your Gems have been depositied."
            tx={complete.user.pendingTx.hash}
            onHide={onHide}
          />
        )}
        <DepositEffect onComplete={this.handleComplete} />
      </Dialog>
    );
  }
}
