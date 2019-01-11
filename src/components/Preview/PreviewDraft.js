import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  matchProps,
} from '@expandorg/app-utils';

import Content from '../shared/Content';

import PreviewDraftSequence from './draft/PreviewDraftSequence';

import { authenticated } from '../shared/auth';

import { fetch } from '../../sagas/draftsSagas';

import { makeDraftSelector } from '../../selectors/draftsSelectors';
import { fetchDraftStateSelector } from '../../selectors/uiStateSelectors';
import { draftProps } from '../shared/propTypes';

import styles from './PreviewDraft.module.styl';

const makeMapStateToProps = () => {
  const draftSelector = makeDraftSelector();
  return (state, props) => ({
    draft: draftSelector(state, props.match.params.id),
    loadState: fetchDraftStateSelector(state),
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

class PreviewDraft extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    draft: draftProps,
    loadState: requestStateProps.isRequired,
    fetch: PropTypes.func.isRequired,
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

  render() {
    const { draft } = this.props;
    // const isLoading = !draft && loadState.state === RequestStates.Fetching;

    return (
      <Content
        title="Preview"
        className={styles.page}
        sidebar={false}
        navbar={false}
      >
        {draft && <PreviewDraftSequence draft={draft} />}
      </Content>
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
