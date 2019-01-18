import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@expandorg/components';

import EditEmailForm from './EditEmailForm';
import EditEmailComplete from './EditEmailComplete';

import { EditEmailEffect } from './stateEffects';

export default class EditEmailDialog extends Component {
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
      <Dialog visible onHide={onHide} contentLabel="email-dialog" hideButton>
        {!complete && <EditEmailForm {...this.props} />}
        {complete && <EditEmailComplete {...this.props} />}
        <EditEmailEffect onComplete={this.handleComplete} />
      </Dialog>
    );
  }
}
