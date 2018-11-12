const initialState = {};

const dataEntitiesReducer = (state = initialState, action) => {
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
