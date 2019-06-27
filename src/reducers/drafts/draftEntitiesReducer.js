import { normalizedItemsReducer } from '@expandorg/app-utils';
import { draftsActionTypes } from '../../sagas/actionTypes';

const normalizedReducer = normalizedItemsReducer('drafts');

export default function draftEntitiesReducer(state = {}, action) {
  switch (action.type) {
    case draftsActionTypes.UPDATE_VARIABLES: {
      const { id, variables } = action;
      const updated = { ...state[id], variables };
      return { ...state, [id]: updated };
    }
    default:
      break;
  }
  if (action.meta && action.meta.optimistic) {
    return state;
  }
  return normalizedReducer(state, action);
}
