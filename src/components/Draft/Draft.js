import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  matchProps,
  locationProps,
} from '@expandorg/app-utils';

import { draftProps } from '../shared/propTypes';
import { authenticated } from '../shared/auth';

import DraftWizard from './DraftWizard';

import {
  makeDraftSelector,
  draftSavingSelector,
} from '../../selectors/draftsSelectors';

import { fetchDraftStateSelector } from '../../selectors/uiStateSelectors';

import { fetch } from '../../sagas/draftsSagas';

const makeMapStateToProps = () => {
  const draftSelector = makeDraftSelector();
  return (state, props) => ({
    draft: draftSelector(state, props.match.params.id),
    isSaving: draftSavingSelector(state),
    loadState: fetchDraftStateSelector(state),
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

class Draft extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    location: locationProps.isRequired,
    isSaving: PropTypes.bool.isRequired,
    draft: draftProps,
    loadState: requestStateProps.isRequired,
    fetch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    draft: null,
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetch(match.params.id);
  }

  componentDidUpdate({ match: prevMatch }) {
    const { match } = this.props;
    if (match.params.id !== prevMatch.params.id) {
      this.props.fetch(match.params.id);
    }
  }

  render() {
    const { draft, loadState, location, isSaving } = this.props;
    const isLoading = !draft && loadState.state === RequestStates.Fetching;
    const tab = (location.state && location.state.tab) || 0;
    return (
      <DraftWizard
        draft={draft}
        tab={tab}
        isSaving={isSaving}
        isLoading={isLoading}
      />
    );
  }
}

export default withRouter(
  authenticated(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(Draft)
  )
);
