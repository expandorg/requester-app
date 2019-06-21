import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { draftProps } from '../../../shared/propTypes';

import { updateSettings } from '../../../../sagas/draftsSagas';
import { updateDraftSettingsStateSelector } from '../../../../selectors/uiStateSelectors';

import Settings from './Settings';

const mapsStateToProps = state => ({
  requestState: updateDraftSettingsStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSettings }, dispatch);

class SettingsContainer extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    requestState: requestStateProps.isRequired,

    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
  };

  handleUpdate = settings => {
    const { requestState, draft } = this.props;
    if (requestState.state !== RequestStates.Fetching) {
      this.props.updateSettings(draft.id, settings);
    }
  };

  handleUpdateComplete = () => {
    const { onNext } = this.props;
    onNext();
  };

  render() {
    const { draft, requestState, onBack } = this.props;
    const isSubmitting = requestState.state === RequestStates.Fetching;
    return (
      <SubmitStateEffect
        submitState={requestState}
        onComplete={this.handleUpdateComplete}
      >
        <Settings
          draft={draft}
          isSubmitting={isSubmitting}
          onNext={this.handleUpdate}
          onBack={onBack}
        />
      </SubmitStateEffect>
    );
  }
}
export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(SettingsContainer);
