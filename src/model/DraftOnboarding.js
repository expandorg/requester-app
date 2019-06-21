// @flow
import nanoid from 'nanoid';

import { replaceAtIndex, insertAtIndex } from '@expandorg/utils';

import {
  type Draft,
  type DraftOnboardingGroupTemplate,
  type DraftOnboardingStep,
} from './types.flow';

export default class DraftOnboarding {
  static add(draft: Draft, template: DraftOnboardingGroupTemplate) {
    const step = {
      id: nanoid(),
      name: template.name,
      isGroup: template.isGroup,
      scoreThreshold: template.scoreThreshold,
      retries: template.retries,
      failureMessage: template.failureMessage,
      data: template.data,
      form: template.taskForm,
    };

    const steps = [...(draft.onboarding.steps || []), step];
    return { ...draft.onboarding, enabled: steps.length > 0, steps };
  }

  static remove(draft: Draft, id: string) {
    // $FlowFixMe
    const steps = draft.onboarding.steps.filter(s => s.id !== id);
    return { ...draft.onboarding, enabled: steps.length > 0, steps };
  }

  static update(draft: Draft, step: DraftOnboardingStep) {
    const index = draft.onboarding.steps.findIndex(s => s.id === step.id);
    const steps = replaceAtIndex(draft.onboarding.steps, index, step);
    return { ...draft.onboarding, steps };
  }

  static duplicate(draft: Draft, id: string) {
    const index = draft.onboarding.steps.findIndex(s => s.id === id);
    const original = draft.onboarding.steps[index];
    const copy = { ...original, id: nanoid(), name: `${original.name} - copy` };
    const steps = insertAtIndex(draft.onboarding.steps, index + 1, copy);
    return { ...draft.onboarding, steps };
  }
}
