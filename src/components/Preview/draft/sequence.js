// @flow

export const ONBOARDING = Symbol('onboarding');
export const ONBOARDING_FINISHED = Symbol('onboarding-finished');
export const TASK = Symbol('task');
export const REPEAT = Symbol('repeat');

type ActiveId = ?number | ?Symbol;

export const getActive = (
  { taskForm, onboarding }: Object,
  active: ActiveId
) => {
  if (active === TASK) {
    return { display: active, form: taskForm };
  }
  if (active === ONBOARDING_FINISHED || active === REPEAT) {
    return { display: active, form: null };
  }
  if (active === REPEAT) {
    return { display: REPEAT, form: null };
  }
  return { display: ONBOARDING, form: onboarding.steps[active].form };
};

export const getNextStep = (
  { onboarding }: Object,
  active: ActiveId = null
) => {
  const hasOnboarding = onboarding && onboarding.steps.length > 0;

  if (active === null || active === REPEAT) {
    return hasOnboarding ? 0 : TASK;
  }
  if (active === ONBOARDING_FINISHED) {
    return TASK;
  }
  if (active === TASK) {
    return REPEAT;
  }

  if (typeof active !== 'number') {
    return null;
  }
  if (active === onboarding.steps.length - 1) {
    return ONBOARDING_FINISHED;
  }
  return active + 1;
};
