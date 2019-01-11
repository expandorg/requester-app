// @flow
import {
  validationFormProps,
  validationTaskFormProps,
} from '../../../../shared/FormEditor/model/validation';

export const taskSelected = Symbol('taskSelected');
export const verificationSelected = Symbol('verificationSelected');

export const getFormEditorProps = (
  { taskForm, verificationForm, variables, varsSample }: Object,
  { steps, selected }: Object
) => {
  if (selected === null) {
    return null;
  }

  if (selected === taskSelected) {
    return {
      form: taskForm,
      title: 'Task',
      validateForm: validationTaskFormProps,
      variables,
      varsSample,
    };
  }
  if (selected === verificationSelected) {
    return {
      form: verificationForm,
      title: 'Verification',
      validateForm: validationTaskFormProps,
      variables,
      varsSample,
    };
  }
  return {
    form: steps[selected].form,
    title: 'Onboarding',
    validateForm: validationFormProps,
  };
};
