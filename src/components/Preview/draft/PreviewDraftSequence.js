import React, { Component } from 'react';

import OnboardingComplete from './OnboardingComplete';
import TaskComplete from './TaskComplete';

import ModulesForm from './ModulesForm';

import { draftProps } from '../../shared/propTypes';

import {
  getActive,
  getNextStep,
  ONBOARDING,
  ONBOARDING_FINISHED,
  TASK,
  REPEAT,
} from './sequence';

export default class PreviewDraftSequence extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
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

  handleSubmit = () => {
    const { draft } = this.props;
    const { active } = this.state;
    this.setState({
      active: getNextStep(draft, active),
    });
  };

  render() {
    const { draft } = this.props;
    const { active } = this.state;

    const { form, display } = getActive(draft, active);

    const displayForm = (form && display === ONBOARDING) || display === TASK;
    return (
      <>
        {display === ONBOARDING_FINISHED && (
          <OnboardingComplete draft={draft} onSubmit={this.handleSubmit} />
        )}
        {displayForm && (
          <ModulesForm form={form} onSubmit={this.handleSubmit} />
        )}
        {display === REPEAT && (
          <TaskComplete draft={draft} onSubmit={this.handleSubmit} />
        )}
      </>
    );
  }
}
