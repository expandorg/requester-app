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

import { Navigation, NavItem } from '../Draft/Wizard/Navigation';
import { LoadIndicator } from '../Draft/Wizard/Form';

import Settings from '../Draft/Wizard/Settings/Settings';

import { createDraft } from '../../sagas/draftsSagas';
import { createDraftStateSelector } from '../../selectors/uiStateSelectors';

import styles from './Create.module.styl';

const mapsStateToProps = state => ({
  requestState: createDraftStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createDraft }, dispatch);

class Create extends Component {
  static propTypes = {
    createDraft: PropTypes.func.isRequired,
    history: historyProps.isRequired,
    requestState: requestStateProps.isRequired,
  };

  handleNextClick = draft => {
    const { requestState } = this.props;
    if (requestState.state !== RequestStates.Fetching) {
      this.props.createDraft(draft);
    }
  };

  handleCreateComplete = createState => {
    const { history } = this.props;
    const { draft } = createState.payload.result;
    history.replace(`/draft/${draft}`, { tab: 1 });
  };

  render() {
    const { requestState } = this.props;
    const isSubmitting = requestState.state === RequestStates.Fetching;
    return (
      <Page
        title="Create a task"
        className={styles.content}
        sidebar={false}
        navbar={false}
        footer={false}
      >
        <Navbar title="Create a task" top={false} logout={false}>
          <Navigation active={0}>
            <NavItem>Settings</NavItem>
            <NavItem disabled>Upload</NavItem>
            <NavItem disabled>Templates</NavItem>
            <NavItem disabled>Create Task</NavItem>
            <NavItem disabled>Pay</NavItem>
          </Navigation>
        </Navbar>
        <div className={styles.container}>
          <LoadIndicator
            isLoading={isSubmitting}
            message="Preparing your task, please wait..."
          >
            <Settings
              onNext={this.handleNextClick}
              isSubmitting={isSubmitting}
            />
          </LoadIndicator>
          <SubmitStateEffect
            submitState={requestState}
            onComplete={this.handleCreateComplete}
          />
        </div>
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
