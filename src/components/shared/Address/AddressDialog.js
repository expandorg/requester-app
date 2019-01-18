import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import AddressForm from './AddressForm';

export default class AddressDialog extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide } = this.props;

    return (
      <Dialog visible onHide={onHide} contentLabel="addres-dialog" hideButton>
        <AddressForm {...this.props} />
      </Dialog>
    );
  }
}
