// @flow

export const WizardSteps = {
  Data: 'Data',
  Quiz: 'Quiz',
  Settings: 'Settings',
  FormEditor: 'FormEditor',
  Preview: 'Preview',
};

export const LoadingMessages = {
  [WizardSteps.Data]: null,
  [WizardSteps.Quiz]: null,
  [WizardSteps.Settings]: null,
  [WizardSteps.FormEditor]: 'Preparing the quiz editor, please wait...',
  [WizardSteps.Preview]: null,
};

export const hasData = (data: Object) =>
  data && data.steps && data.steps.length > 0;

export const hasModules = (form: Object) =>
  form && form.modules && form.modules.length > 0;
