import { normalizedItemsReducer } from '@expandorg/app-utils';
import { draftsActionTypes } from '../../sagas/actionTypes';

const normalizedReducer = normalizedItemsReducer('drafts');

export default function draftEntitiesReducer(state = {}, action) {
  switch (action.type) {
    case draftsActionTypes.UPDATE_ONBOARDING: {
      const { id, onboarding } = action.payload;
      if (action.meta && action.meta.optimistic) {
        const updated = { ...state[id], onboarding };
        return { ...state, [id]: updated };
      }
      break;
    }
    case draftsActionTypes.UPDATE_VARIABLES: {
      const { id, variables } = action.payload;
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
