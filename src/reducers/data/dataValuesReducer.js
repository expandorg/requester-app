import { dataActionTypes } from '../../sagas/actionTypes';

const initialState = {};

const dataValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case dataActionTypes.FETCH_COMPLETE: {
      const {
        result: {
          data: id,
          pagination: { total, current: page },
        },
        entities,
      } = action.payload;
      const { values } = entities.data[id];
      const e = state[id] || { total, pages: {} };
      return {
        ...state,
        [id]: {
          ...e,
          pages: { ...e.pages, [page]: values },
        },
      };
    }
    default:
      break;
  }
  return state;
};

export default dataValuesReducer;
