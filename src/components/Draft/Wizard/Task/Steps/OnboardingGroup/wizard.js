// @flow

export const WizardSteps = {
  Data: 'Data',
  Quiz: 'Quiz',
  FormEditor: 'FormEditor',
  Preview: 'Preview',
};

export const LoadingMessages = {
  [WizardSteps.Data]: null,
  [WizardSteps.Quiz]: null,
  [WizardSteps.FormEditor]: 'Preparing the quiz editor, please wait...',
  [WizardSteps.Preview]: null,
};

export const hasData = data => data && data.values && data.values.length > 0;

export const hasModules = form =>
  form && form.modules && form.modules.length > 0;
