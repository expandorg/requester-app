import { tasksActionTypes } from '../sagas/actionTypes';

const initialState = [];

export default function dashboardTasksReducer(state = initialState, action) {
  switch (action.type) {
    case tasksActionTypes.FETCH_LIST_COMPLETE:
      return action.payload.tasks;
    default:
      break;
  }
  return state;
}
