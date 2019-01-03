import { userReducer as reducer } from '@gemsorg/app-auth';
import { gemsActionTypes } from '@gemsorg/app-gemtokens';
import { userActionTypes as baseUserActions } from '@gemsorg/app-utils/app';

import { userActionTypes } from '../sagas/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case baseUserActions.UPDATED:
      return action.payload.data.user;

    case userActionTypes.ASSIGN_ADDRESS_COMPLETE:
    case userActionTypes.EDIT_EMAIL_COMPLETE: {
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
