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
import ConfirmationDialog from '../../../shared/ConfirmationDialog';

import { LoadIndicator } from '../Form';
import TemplatesList from './TemplatesList';

import { selectTemplate } from '../../../../sagas/draftsSagas';
import { selectDraftTemplateStateSelector } from '../../../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  submitState: selectDraftTemplateStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTemplate }, dispatch);

class Templates extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,
    onNext: PropTypes.func.isRequired,
    selectTemplate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      selected: props.draft.templateId,
      confirmDialog: false,
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        selected: draft.templateId,
      };
    }
    return null;
  }

  handleSelect = selected => {
    this.setState({ selected });
  };

  handleNextClick = () => {
    const { onNext, draft, submitState } = this.props;

    if (submitState.state !== RequestStates.Fetching) {
      const { selected } = this.state;
      if (draft.templateId !== selected) {
        this.setState({ confirmDialog: true });
      } else {
        onNext();
      }
    }
  };

  handleToggleConfirm = () => {
    this.setState(({ confirmDialog }) => ({ confirmDialog: !confirmDialog }));
  };

  handleConfirm = () => {
    const { draft } = this.props;
    const { selected } = this.state;
    this.setState({ confirmDialog: false });
    this.props.selectTemplate(draft.id, selected);
  };

  render() {
    const { submitState, onNext } = this.props;
    const { selected, confirmDialog } = this.state;

    return (
      <SubmitStateEffect submitState={submitState} onComplete={onNext}>
        <LoadIndicator
          isLoading={submitState.state === RequestStates.Fetching}
          message="Preparing your task, please wait..."
        >
          <TemplatesList
            title="What type of task do you want to build?"
            selected={selected}
            onSelect={this.handleSelect}
            onNext={this.handleNextClick}
          />
        </LoadIndicator>
        {confirmDialog && (
          <ConfirmationDialog
            title="You already have an active template."
            confirmation="If you change it all data will be lost. Are you sure you want to continue?"
            onHide={this.handleToggleConfirm}
            onConfirm={this.handleConfirm}
          />
        )}
      </SubmitStateEffect>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Templates);
