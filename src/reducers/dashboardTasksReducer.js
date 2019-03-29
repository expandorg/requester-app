import { tasksActionTypes, draftsActionTypes } from '../sagas/actionTypes';

const initialState = [];

export default function dashboardTasksReducer(state = initialState, action) {
  switch (action.type) {
    case tasksActionTypes.FETCH_LIST_COMPLETE:
      return action.payload.tasks;
    case draftsActionTypes.REMOVE_COMPLETE: {
      const { draftId } = action.payload;
      return state.filter(d => d.id !== draftId);
    }
    case draftsActionTypes.COPY_COMPLETE: {
      const { result, entities } = action.payload;
      return [entities.drafts[result.draft], ...state];
    }
    default:
      break;
  }
  return state;
}
