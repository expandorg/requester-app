import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import DraftWizard from './DraftWizard';

import { makeDraftSelector } from '../../selectors/draftsSelectors';

const makeMapStateToProps = () => {
  const draftsSelector = makeDraftSelector();
  return (state, props) => ({
    draft: draftsSelector(state, props.id),
  });
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

class Draft extends Component {
  render() {
    return <DraftWizard />;
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(Draft);
