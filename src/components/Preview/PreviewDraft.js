import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNotification } from '@expandorg/app-utils/app';

import { Sidebar, Navbar } from '@expandorg/components/app';
import { Panel } from '@expandorg/components';

import {
  requestStateProps,
  RequestStates,
  matchProps,
} from '@expandorg/app-utils';

import Page from '../shared/Page';

import PreviewDraftSequence from './draft/PreviewDraftSequence';

import { authenticated } from '../shared/auth';

import { fetch } from '../../sagas/draftsSagas';

import { makeDraftSelector } from '../../selectors/draftsSelectors';
import { fetchDraftStateSelector } from '../../selectors/uiStateSelectors';
import { draftProps } from '../shared/propTypes';

import styles from './styles.module.styl';

const makeMapStateToProps = () => {
  const draftSelector = makeDraftSelector();
  return (state, props) => ({
    draft: draftSelector(state, props.match.params.id),
    loadState: fetchDraftStateSelector(state),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetch, addNotification }, dispatch);

class PreviewDraft extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    draft: draftProps,
    loadState: requestStateProps.isRequired,
    fetch: PropTypes.func.isRequired,
    addNotification: PropTypes.func.isRequired,
  };

  static defaultProps = {
    draft: null,
  };

  componentDidMount() {
    window.addEventListener('message', this.handleMessage, false);
    const { match } = this.props;
    this.props.fetch(match.params.id);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessage);
  }

  handleMessage = ({ data }) => {
    if (typeof data === 'object' && data.type === 'updateDraft') {
      const { match, loadState } = this.props;
      const isLoading = loadState.state === RequestStates.Fetching;

      if (data.draft.id === match.params.id && !isLoading) {
        this.props.fetch(match.params.id);
      }
    }
  };

  handleNotify = (type, message) => {
    this.props.addNotification(type, message);
  };

  render() {
    const { draft } = this.props;
    // const isLoading = !draft && loadState.state === RequestStates.Fetching;

    return (
      <Page title="Preview" className={styles.page}>
        <Navbar title={draft ? draft.name : ''} />
        <Sidebar />
        <div className={styles.container}>
          <Panel className={styles.panel}>
            {draft && (
              <PreviewDraftSequence
                draft={draft}
                onNotify={this.handleNotify}
              />
            )}
          </Panel>
        </div>
      </Page>
    );
  }
}

export default withRouter(
  authenticated(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(PreviewDraft)
  )
);
