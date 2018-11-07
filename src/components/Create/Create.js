import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import { historyProps } from '../shared/propTypes';
import { SubmitStateEffect } from '../common/submitStateEffect';
import Content from '../shared/Content';
import Navbar from '../shared/Navbar';

import { Navigation, NavItem } from '../Draft/Wizard/Navigation';
import Settings from '../Draft/Wizard/Settings';

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

  handleCreate = draft => {
    const { requestState } = this.props;
    if (requestState.state !== RequestStates.Fetching) {
      this.props.createDraft(draft);
    }
  };

  handleCreateComplete = createState => {
    const { history } = this.props;
    const { draft } = createState.payload.result;
    history.replace(`/draft/${draft}`, { page: 1 });
  };

  render() {
    const { requestState } = this.props;
    return (
      <SubmitStateEffect
        submitState={requestState}
        onComplete={this.handleCreateComplete}
      >
        <Content
          title="Create a task"
          className={styles.content}
          sidebar={false}
          navbar={false}
        >
          <Navbar title="Create a task" top={false}>
            <Navigation active={0}>
              <NavItem>Settings</NavItem>
              <NavItem disabled>Upload</NavItem>
              <NavItem disabled>Templates</NavItem>
              <NavItem disabled>Create Task</NavItem>
              <NavItem disabled>Whitelist</NavItem>
              <NavItem disabled>Pay</NavItem>
            </Navigation>
          </Navbar>
          <div className={styles.container}>
            <Settings onNext={this.handleCreate} />
          </div>
        </Content>
      </SubmitStateEffect>
    );
  }
}
export default withRouter(
  connect(
    mapsStateToProps,
    mapDispatchToProps
  )(Create)
);
