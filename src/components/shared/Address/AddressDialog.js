import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@gemsorg/components';

import AddressForm from './AddressForm';

import dstyles from '../../common/dialog.module.styl';

export default class AddressDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide } = this.props;

    return (
      <Dialog
        visible
        onHide={onHide}
        overlayClass={dstyles.overlay}
        modalClass={dstyles.modal}
        contentLabel="addres-dialog"
        hideButton
      >
        <AddressForm {...this.props} />
      </Dialog>
    );
  }
}
