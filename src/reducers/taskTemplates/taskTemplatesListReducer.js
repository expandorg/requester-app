import { tasksActionTypes } from '../../sagas/actionTypes';

const initialState = [];

export default function taskTemplatesListReducer(state = initialState, action) {
  switch (action.type) {
    case tasksActionTypes.FETCH_TEMPLATES_COMPLETE:
      return action.payload.result.templates;
    default:
      break;
  }
  return state;
}
