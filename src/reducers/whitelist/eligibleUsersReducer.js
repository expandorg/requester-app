import { whitelistActionTypes } from '../../sagas/actionTypes';

const initialState = null;

export default function eligibleUsersReducer(state = initialState, action) {
  switch (action.type) {
    case whitelistActionTypes.GET_ELIGIBLE_COMPLETE:
      return action.payload.users;
    default:
      break;
  }
  return state;
}
