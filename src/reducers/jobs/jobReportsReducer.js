import { jobReportsActionTypes } from '../../sagas/actionTypes';

const initialState = [];

export default function jobReportsReducer(state = initialState, action) {
  switch (action.type) {
    case jobReportsActionTypes.FETCH_LIST_COMPLETE:
      return action.payload.reports;
    default:
      break;
  }
  return state;
}
