import { draftsActionTypes } from '../../sagas/actionTypes';

export default function draftSavingReducer(state = false, action) {
  switch (action.type) {
    case draftsActionTypes.UPDATE_TASK:
    case draftsActionTypes.UPDATE_VERIFICATION_SETTINGS:
    case draftsActionTypes.UPDATE_VERIFICATION_FORM:
    case draftsActionTypes.UPDATE_ONBOARDING:
    case draftsActionTypes.UPDATE_VARIABLES:
      return true;
    case draftsActionTypes.UPDATE_TASK_COMPLETE:
    case draftsActionTypes.UPDATE_TASK_FAILED:
    case draftsActionTypes.UPDATE_VERIFICATION_SETTINGS_COMPLETE:
    case draftsActionTypes.UPDATE_VERIFICATION_SETTINGS_FAILED:
    case draftsActionTypes.UPDATE_VERIFICATION_FORM_COMPLETE:
    case draftsActionTypes.UPDATE_VERIFICATION_FORM_FAILED:
    case draftsActionTypes.UPDATE_ONBOARDING_COMPLETE:
    case draftsActionTypes.UPDATE_ONBOARDING_FAILED:
    case draftsActionTypes.UPDATE_VARIABLES_COMPLETE:
    case draftsActionTypes.UPDATE_VARIABLES_FAILED:
      return false;
    default:
      break;
  }
  return state;
}
