// @flow

export const WizardSteps = {
  Forms: 0,
  Data: 1,
  Settings: 2,
  // Whitelist: 3,
  Pay: 3,
  Summary: 4,
};

export const getNavState = () => ({
  forms: {},
  data: {},
  settings: {},
  whitelist: {},
  pay: {},
});
