import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import ConfirmationDialog from '../../../shared/ConfirmationDialog';

import { draftProps } from '../../../shared/propTypes';

import { removeData } from '../../../../sagas/dataSagas';
import { removeDataStateSelector } from '../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  removeState: removeDataStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ removeData }, dispatch);

class DeleteDialog extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    onHide: PropTypes.func.isRequired,
    removeState: requestStateProps.isRequired,
    removeData: PropTypes.func.isRequired,
  };

  handleDelete = evt => {
    const { draft, removeState } = this.props;
    if (removeState.state !== RequestStates.Fetching) {
      this.props.removeData(draft.id);
    }
    evt.preventDefault();
  };

  handleHide = evt => {
    const { onHide, removeState } = this.props;
    if (removeState.state !== RequestStates.Fetching) {
      onHide(evt);
    }
  };

  render() {
    return (
      <ConfirmationDialog
        title="You are about to remove your data."
        confirmation="Are you sure you want to continue?"
        onHide={this.handleHide}
        onConfirm={this.handleDelete}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteDialog);
