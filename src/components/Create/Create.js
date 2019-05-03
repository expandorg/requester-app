import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
  historyProps,
} from '@expandorg/app-utils';

import Navbar from '../shared/Navbar';
import Page from '../shared/Page';

import { authenticated } from '../shared/auth';

import { LoadIndicator } from '../Draft/Wizard/Form';

import TemplatesList from '../Draft/Wizard/Templates/TemplatesList';

import { createDraft } from '../../sagas/draftsSagas';
import { taskTemplatesListSelector } from '../../selectors/taskTemplatesSelectors';
import {
  createDraftStateSelector,
  fetchTemplatesStateSelector,
} from '../../selectors/uiStateSelectors';

import styles from './Create.module.styl';

const mapsStateToProps = state => ({
  submitState: createDraftStateSelector(state),
  templateIds: taskTemplatesListSelector(state),
  fetchTemplatesState: fetchTemplatesStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createDraft }, dispatch);

class Create extends Component {
  static propTypes = {
    history: historyProps.isRequired,
    templateIds: PropTypes.arrayOf(PropTypes.string),
    submitState: requestStateProps.isRequired,
    fetchTemplatesState: requestStateProps.isRequired,
    createDraft: PropTypes.func.isRequired,
  };

  static defaultProps = {
    templateIds: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      templateId: props.templateIds.length ? props.templateIds[0] : null,
    };
  }

  handleFetched = () => {
    const { templateId } = this.state;
    if (templateId === null) {
      const { templateIds } = this.props;
      if (templateIds.length) {
        this.handleSelect(templateIds[0]);
      }
    }
  };

  handleCreate = () => {
    const { submitState } = this.props;
    const { templateId } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      this.props.createDraft(templateId);
    }
  };

  handleCreated = createState => {
    const { history } = this.props;
    const { draft } = createState.payload.result;
    history.replace(`/draft/${draft}`, { tab: 1 });
  };

  handleSelect = templateId => {
    this.setState({ templateId });
  };

  render() {
    const { submitState, fetchTemplatesState } = this.props;
    const { templateId } = this.state;

    return (
      <Page
        title="New task"
        className={styles.page}
        sidebar={false}
        navbar={false}
        footer={false}
      >
        <Navbar title="New Task" top={false} logout={false} />
        <div className={styles.container}>
          <LoadIndicator
            isLoading={submitState.state === RequestStates.Fetching}
            message="Preparing your task, please wait..."
          >
            <TemplatesList
              title="What type of task do you want to build?"
              nextTitle="Create"
              selected={templateId}
              onSelect={this.handleSelect}
              onNext={this.handleCreate}
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
      mapDispatchToProps
    )(Create)
  )
);
