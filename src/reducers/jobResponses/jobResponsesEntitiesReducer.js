import { tasksActionTypes } from '../../sagas/actionTypes';

export default function jobResponsesEntitiesReducer(state = {}, action) {
  switch (action.type) {
    case tasksActionTypes.FETCH_RESPONSES_COMPLETE: {
      const { payload, meta } = action;
      return {
        ...state,
        [payload.id]: {
          ...(state[payload.id] || {}),
          [+meta.params.page || 0]: payload.results,
        },
      };
    }
    default:
      break;
  }
  return state;
}
