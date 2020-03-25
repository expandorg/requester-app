// @flow
import { createSelector } from 'reselect';

export const dataStateSelector = (state: Object) => state.data;

export const dataEntitiesSelector: any = createSelector(
  dataStateSelector,
  (state) => state.entities
);

export const dataValuesSelector: any = createSelector(
  dataStateSelector,
  (state) => state.values
);

export const makeDataSelector = (): any =>
  createSelector(
    dataEntitiesSelector,
    dataValuesSelector,
    (state, id) => id,
    (state, id, page) => page,
    (entities, valueEntites, id, page) => {
      const entity = entities[id];
      if (!entity) {
        return null;
      }
      const { total, pages } = valueEntites[id];
      const values = pages[page] || [];
      return {
        ...entity,
        total,
        values:
          values.length > 500
            ? values.filter((_, index) => index < 500)
            : values,
      };
    }
  );
