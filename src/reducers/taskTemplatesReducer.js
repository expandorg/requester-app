import { tasksActionTypes } from '../sagas/actionTypes';

const initialState = [];

export default function taskTemplatesReducer(state = initialState, action) {
  switch (action.type) {
    case tasksActionTypes.FETCH_TEMPLATES_COMPLETE:
      return action.payload.templates;
    default:
      break;
  }
  return state;
}
