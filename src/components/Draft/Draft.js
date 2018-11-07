import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { matchProps, draftProps, locationProps } from '../shared/propTypes';

import DraftWizard from './DraftWizard';

import { makeDraftSelector } from '../../selectors/draftsSelectors';
import { fetch } from '../../sagas/draftsSagas';

const makeMapStateToProps = () => {
  const draftsSelector = makeDraftSelector();
  return (state, props) => ({
    draft: draftsSelector(state, props.id),
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetch }, dispatch);

class Draft extends Component {
  static propTypes = {
    match: matchProps.isRequired,
    location: locationProps.isRequired,
    draft: draftProps,
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
    const { draft, location } = this.props;
    const page = (location.state && location.state.page) || 0;
    return <DraftWizard draft={draft} page={page} />;
  }
}

export default withRouter(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(Draft)
);
