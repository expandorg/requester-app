import { formActionTypes } from '../../sagas/actionTypes';

const initialState = [];

export default function formTemplatesListReducer(state = initialState, action) {
  switch (action.type) {
    case formActionTypes.FETCH_TEMPLATES_COMPLETE:
      return action.payload.result.templates;
    default:
      break;
  }
  return state;
}
