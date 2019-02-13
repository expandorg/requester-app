import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import OnboardingComplete from './OnboardingComplete';
import TaskComplete from './TaskComplete';

import ModulesForm from './ModulesForm';
import { hasData } from '../../Draft/wizard';

import { draftProps } from '../../shared/propTypes';

import { fetch as fetchData } from '../../../sagas/dataSagas';

import { makeDataVarsSampleSelector } from '../../../selectors/dataSelectors';

import {
  getActive,
  getNextStep,
  ONBOARDING,
  ONBOARDING_FINISHED,
  TASK,
  REPEAT,
} from './sequence';

const makeMapStateToProps = () => {
  const dataVarsSampleSelector = makeDataVarsSampleSelector();
  return (state, props) => ({
    variables: dataVarsSampleSelector(state, props.draft.dataId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchData }, dispatch);

class PreviewDraftSequence extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    variables: PropTypes.object, // eslint-disable-line
    fetchData: PropTypes.func.isRequired,
    onNotify: PropTypes.func,
  };

  static defaultProps = {
    variables: null,
    onNotify: Function.prototype,
  };

  constructor(props) {
    super(props);
    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      active: getNextStep(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        active: getNextStep(draft),
      };
    }
    return null;
  }

  componentDidMount() {
    const { draft } = this.props;
    if (draft.dataId) {
      this.props.fetchData(draft.id, draft.dataId, 0);
    }
  }

  componentDidUpdate({ draft: prev }) {
    const { draft } = this.props;
    if (hasData(draft) && draft.dataId !== prev.dataId) {
      this.props.fetchData(draft.id, draft.dataId, 0);
    }
  }

  handleSubmit = () => {
    const { draft } = this.props;
    const { active } = this.state;
    this.setState({
      active: getNextStep(draft, active),
    });
  };

  render() {
    const { draft, variables, onNotify } = this.props;
    const { active } = this.state;

    const { form, display } = getActive(draft, active);

    const displayForm = (form && display === ONBOARDING) || display === TASK;
    return (
      <>
        {display === ONBOARDING_FINISHED && (
          <OnboardingComplete draft={draft} onSubmit={this.handleSubmit} />
        )}
        {displayForm && (
          <ModulesForm
            form={form}
            variables={variables}
            onSubmit={this.handleSubmit}
            onNotify={onNotify}
          />
        )}
        {display === REPEAT && (
          <TaskComplete draft={draft} onSubmit={this.handleSubmit} />
        )}
      </>
    );
  }
}

export default connect(
  makeMapStateToProps,
  mapDispatchToProps
)(PreviewDraftSequence);
