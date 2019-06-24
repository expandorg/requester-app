import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
  historyProps,
} from '@expandorg/app-utils';

import { Dialog } from '@expandorg/components';
import LoadIndicator from '../shared/LoadIndicator';

import Form from './Form';

import { createDraft } from '../../sagas/draftsSagas';
import { fetchTaskTemplates } from '../../sagas/tasksSagas';
import { taskTemplatesSelector } from '../../selectors/taskTemplatesSelectors';
import {
  createDraftStateSelector,
  fetchTemplatesStateSelector,
} from '../../selectors/uiStateSelectors';
import { taskTemplateProps } from '../shared/propTypes';

import styles from './CreateDialog.module.styl';

const mapsStateToProps = state => ({
  submitState: createDraftStateSelector(state),
  templates: taskTemplatesSelector(state),
  fetchTemplatesState: fetchTemplatesStateSelector(state),
});

class CreateDialog extends Component {
  static propTypes = {
    history: historyProps.isRequired,
    templates: PropTypes.arrayOf(taskTemplateProps),

    submitState: requestStateProps.isRequired,
    fetchTemplatesState: requestStateProps.isRequired,

    onToogle: PropTypes.func.isRequired,
    createDraft: PropTypes.func.isRequired,
    fetchTaskTemplates: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templates: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      templateId: props.templates.length ? props.templates[0].id : null,
    };
  }

  componentDidMount() {
    this.props.fetchTaskTemplates();
  }

  handleFetched = () => {
    const { templateId } = this.state;
    const { templates } = this.props;
    if (templateId === null && templates.length) {
      this.handleSelect(templates[0].id);
    }
  };

  handleCreate = () => {
    const { submitState } = this.props;
    const { templateId } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.createDraft(templateId);
    }
  };

  handleCreated = ({ payload }) => {
    const { history } = this.props;
    history.replace(`/draft/${payload.result.draft}`);
  };

  handleSelect = templateId => {
    this.setState({ templateId });
  };

  handleHide = () => {
    const { onToogle } = this.props;
    onToogle(false);
  };

  render() {
    const { submitState, fetchTemplatesState, templates } = this.props;
    const { templateId } = this.state;
    const isLoading = submitState.state === RequestStates.Fetching;

    return (
      <Dialog
        visible
        onHide={this.handleHide}
        modalClass={styles.modal}
        contentLabel="create-dialog"
        hideButton
      >
        <div className={styles.container}>
          <LoadIndicator
            isLoading={isLoading}
            message="Preparing your task, please wait..."
          >
            <Form
              templates={templates}
              selected={templateId}
              onSelect={this.handleSelect}
              onCreate={this.handleCreate}
              onPreview={Function.prototype}
              onHide={this.handleHide}
            />
          </LoadIndicator>
        </div>
        <SubmitStateEffect
          submitState={submitState}
          onComplete={this.handleCreated}
        />
        <SubmitStateEffect
          submitState={fetchTemplatesState}
          onComplete={this.handleFetched}
        />
      </Dialog>
    );
  }
}
export default withRouter(
  connect(
    mapsStateToProps,
    { createDraft, fetchTaskTemplates }
  )(CreateDialog)
);
