// @flow

export const WizardSteps = {
  Data: 'Data',
  Settings: 'Settings',
};

export const hasData = (data: Object) =>
  data && data.steps && data.steps.length > 0;

export const hasModules = (form: Object) =>
  form && form.modules && form.modules.length > 0;
