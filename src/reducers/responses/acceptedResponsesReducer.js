import { responsesActionTypes } from '../../sagas/actionTypes';

export default function acceptedResponsesReducer(state = {}, action) {
  switch (action.type) {
    case responsesActionTypes.FETCH_ACCEPTED_COMPLETE: {
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
