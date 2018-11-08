import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';
import { matchProps, draftProps, locationProps } from '../shared/propTypes';

import DraftWizard from './DraftWizard';

import { makeDraftSelector } from '../../selectors/draftsSelectors';
import { fetchDraftStateSelector } from '../../selectors/uiStateSelectors';

import { fetch } from '../../sagas/draftsSagas';

const makeMapStateToProps = () => {
  const draftsSelector = makeDraftSelector();
  return (state, props) => ({
    draft: draftsSelector(state, +props.match.params.id),
    loadState: fetchDraftStateSelector(state),
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

class Draft extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    location: locationProps.isRequired,
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
    const { draft, loadState, location } = this.props;

    const isLoading = !draft && loadState.state === RequestStates.Fetching;
    const tab = (location.state && location.state.tab) || 0;

    return <DraftWizard draft={draft} tab={tab} isLoading={isLoading} />;
  }
}

export default withRouter(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(Draft)
);
