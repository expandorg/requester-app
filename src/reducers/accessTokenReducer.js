import { accessTokenActionTypes } from '../sagas/actionTypes';

const initialState = null;

export default function accessTokenReducer(state = initialState, action) {
  switch (action.type) {
    case accessTokenActionTypes.GENERATE_KEY_COMPLETE:
      return action.payload.apiKey;
    default:
      break;
  }
  return state;
}
