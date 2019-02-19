// @flow
import { overrideFormVars } from '@expandorg/modules';

import { dataToVars } from '../onboardingData';

import {
  TaskWorkflowState,
  type WorkflowState,
  type OnboardingGroup,
  type OnboardingGroupState,
} from './defs';

const getGroup = ({
  isGroup,
  scoreThreshold,
  retries,
  failureMessage,
  data,
  form,
}: Object): OnboardingGroup => {
  let steps = null;

  if (isGroup) {
    steps = dataToVars(data).map(({ variables, answer }) => ({
      form: overrideFormVars(form, variables),
      answer,
    }));
  } else {
    steps = [{ form }];
  }

  return {
    steps,
    isGroup: !!isGroup,
    scoreThreshold,
    retries,
    failureMessage,
  };
};

const createGroupState = (
  groups: Array<OnboardingGroup>,
  groupState: OnboardingGroupState,
  state: string = TaskWorkflowState.ONBOARDING_GROUP
): WorkflowState => ({
  state,
  groups,
  groupState,
  form: groups[groupState.groupIndex].steps[groupState.stepIndex].form,
});

const initialGroupState: OnboardingGroupState = {
  groupIndex: 0,
  stepIndex: 0,
  incorrect: 0,
  currentTry: 0,
};

export const createOnboardingState = (draft: Object): WorkflowState =>
  createGroupState(
    draft.onboarding.steps.map(step => getGroup(step)),
    initialGroupState
  );

export const repeatOnboardingGroup = ({
  groups,
  groupState,
}: WorkflowState): WorkflowState =>
  createGroupState(groups, {
    ...initialGroupState,
    groupIndex: groupState.groupIndex,
    currentTry: groupState.currentTry,
  });

const pickNextGroupStep = (
  groups: Array<OnboardingGroup>,
  groupState: OnboardingGroupState
): WorkflowState => {
  // try pick next step
  const group = groups[groupState.groupIndex];
  if (groupState.stepIndex + 1 < group.steps.length) {
    return createGroupState(groups, {
      ...groupState,
      stepIndex: groupState.stepIndex + 1,
    });
  }

  // try pick next group
  if (groupState.groupIndex + 1 < groups.length) {
    return createGroupState(groups, {
      ...initialGroupState,
      groupIndex: groupState.groupIndex + 1,
    });
  }

  return {
    state: TaskWorkflowState.ONBOARDING_PASSED,
  };
};

const isResponseCorrect = () => true;

const passThreshold = (incorrect: number, group: OnboardingGroup) => {
  const score = 1 - incorrect / group.steps.length;
  return !group.scoreThreshold || score >= group.scoreThreshold;
};

export const getNextOnboardingState = (
  { groups, groupState }: WorkflowState,
  response: any
): WorkflowState => {
  const group = groups[groupState.groupIndex];

  if (!group.isGroup) {
    return pickNextGroupStep(groups, groupState);
  }
  const step = group.steps[groupState.stepIndex];

  if (isResponseCorrect(step.answer, response)) {
    return pickNextGroupStep(groups, groupState);
  }

  const incorrect = groupState.incorrect + 1;
  if (passThreshold(incorrect, group)) {
    return pickNextGroupStep(groups, { ...groupState, incorrect });
  }

  if (groupState.currentTry + 1 >= group.retries) {
    return {
      state: TaskWorkflowState.ONBOARDING_FAILED,
    };
  }

  return createGroupState(
    groups,
    {
      ...groupState,
      currentTry: groupState.currentTry + 1,
    },
    TaskWorkflowState.ONBOARDING_GROUP_FAILED
  );
};
