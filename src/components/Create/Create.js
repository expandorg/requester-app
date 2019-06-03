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

import Page from '../shared/Page';

import { authenticated } from '../shared/auth';

import { LoadIndicator } from '../Draft/Wizard/Form';

import Form from './Form';

import { createDraft } from '../../sagas/draftsSagas';
import { fetchTaskTemplates } from '../../sagas/tasksSagas';
import { taskTemplatesSelector } from '../../selectors/taskTemplatesSelectors';
import {
  createDraftStateSelector,
  fetchTemplatesStateSelector,
} from '../../selectors/uiStateSelectors';
import { taskTemplateProps } from '../shared/propTypes';

import styles from './Create.module.styl';

const mapsStateToProps = state => ({
  submitState: createDraftStateSelector(state),
  templates: taskTemplatesSelector(state),
  fetchTemplatesState: fetchTemplatesStateSelector(state),
});

class Create extends Component {
  static propTypes = {
    history: historyProps.isRequired,
    templates: PropTypes.arrayOf(taskTemplateProps),

    submitState: requestStateProps.isRequired,
    fetchTemplatesState: requestStateProps.isRequired,

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
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { submitState, fetchTemplatesState, templates } = this.props;
    const { templateId } = this.state;
    const isLoading = submitState.state === RequestStates.Fetching;
    return (
      <Page title="New task" sidebar={false} navbar={false} footer={false}>
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
      </Page>
    );
  }
}
export default withRouter(
  authenticated(
    connect(
      mapsStateToProps,
      { createDraft, fetchTaskTemplates }
    )(Create)
  )
);
