import { userReducer as reducer } from '@expandorg/app-auth';
import { gemsActionTypes } from '@expandorg/app-gemtokens';
import { userActionTypes } from '@expandorg/app-utils/app';
import { accountActionTypes } from '@expandorg/app-account';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.UPDATED:
      return action.payload.data.user;

    case accountActionTypes.ASSIGN_ADDRESS_COMPLETE:
    case accountActionTypes.CONFIRM_EMAIL_COMPLETE:
    case accountActionTypes.EDIT_EMAIL_COMPLETE: {
      return action.payload.user;
    }
    case gemsActionTypes.WITHDRAW_COMPLETE:
    case gemsActionTypes.DEPOSIT_COMPLETE:
      return action.payload.user;

    default:
      break;
  }
  return reducer(state, action);
}
