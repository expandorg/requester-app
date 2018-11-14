import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';
import { SubmitStateEffect } from '../../../common/submitStateEffect';
import Button from '../../../common/Button';

import ConfirmationDialog from '../../../shared/ConfirmationDialog';
import { draftProps } from '../../../shared/propTypes';

import { Form, Description, Actions, LoadIndicator } from '../Form';
import TemplatesContainer from './TemplatesContainer';

import { hasTemplate } from '../../wizard';

import { selectTemplate } from '../../../../sagas/draftsSagas';

import { selectDraftTemplateStateSelector } from '../../../../selectors/uiStateSelectors';

import styles from './Templates.module.styl';

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
    onBack: PropTypes.func.isRequired,

    selectTemplate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      selected: (props.draft && props.draft.templateId) || null,
      confirmDialog: false,
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      const selected = hasTemplate(draft) ? draft.templateId : state.selected;
      return { draft, selected };
    }
    return null;
  }

  handleSelect = selected => {
    this.setState({ selected });
  };

  handleSubmit = () => {
    const { draft, submitState, onNext } = this.props;
    const { selected } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      if (hasTemplate(draft)) {
        if (draft.templateId === selected) {
          onNext();
        } else {
          this.setState({ confirmDialog: true });
        }
      } else {
        this.props.selectTemplate(draft.id, selected);
      }
    }
  };

  handleToggleConfirm = () => {
    this.setState(({ confirmDialog }) => ({ confirmDialog: !confirmDialog }));
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
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
          <Form onSubmit={this.handleSubmit}>
            <div className={styles.container}>
              <Description>Description about this step goes here.</Description>
              <TemplatesContainer
                selected={selected}
                onSelect={this.handleSelect}
              />
            </div>
            <Actions>
              <Button theme="secondary" onClick={this.handleBack}>
                Back
              </Button>
              <Button type="submit" disabled={selected === null}>
                Next
              </Button>
            </Actions>
          </Form>
        </LoadIndicator>
        {confirmDialog && (
          <ConfirmationDialog
            title="You already have an active template. If you change it all data will be lost."
            confirmation="Are you sure you want to continue?"
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
