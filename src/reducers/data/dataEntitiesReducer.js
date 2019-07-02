import { dataActionTypes } from '../../sagas/actionTypes';

const initialState = {};

const dataEntitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case dataActionTypes.UPDATE_COLUMNS: {
      const { dataId, columns } = action.payload;
      return {
        ...state,
        [dataId]: {
          ...state[dataId],
          columns,
        },
      };
    }
    default:
      break;
  }

  if (action.meta && action.meta.optimistic) {
    return state;
  }

  if (action.payload) {
    const { entities } = action.payload;
    if (entities && entities.data) {
      const data = Reflect.ownKeys(entities.data).reduce((all, id) => {
        const { values: _, ...entity } = entities.data[id];
        all[id] = entity;
        return all;
      }, {});

      return { ...state, ...data };
    }
  }
  return state;
};

export default dataEntitiesReducer;
