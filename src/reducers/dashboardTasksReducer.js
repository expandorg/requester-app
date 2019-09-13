import { insertAtIndex } from '@expandorg/utils';

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
      const {
        payload: { result, entities },
        meta: { originalId },
      } = action;
      const item = entities.drafts[result.draft];
      const index = state.findIndex(d => d.id === originalId);
      if (index === -1) {
        return [item, ...state];
      }
      return insertAtIndex(state, index + 1, item);
    }
    default:
      break;
  }
  return state;
}
