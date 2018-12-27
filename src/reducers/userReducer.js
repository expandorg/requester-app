import { userReducer as reducer } from '@gemsorg/app-auth';
import { gemsActionTypes } from '@gemsorg/app-gemtokens';

import { userActionTypes } from '../sagas/actionTypes';

const initialState = null;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.ASSIGN_ADDRESS_COMPLETE: {
      console.log(1);
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
