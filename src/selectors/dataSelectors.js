// @flow
import { createSelector } from 'reselect';

export const dataStateSelector = (state: Object) => state.data;

export const dataEntitiesSelector = createSelector(
  dataStateSelector,
  state => state.entities
);

export const dataValuesSelector = createSelector(
  dataStateSelector,
  state => state.values
);

export const makeDataSelector = () =>
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

export const makeDataColumnNamesSelector = () =>
  createSelector(
    dataEntitiesSelector,
    (state, id) => id,
    (entities, id) => {
      const entity = entities[id];
      if (!entity) {
        return null;
      }
      return entity.columns.filter(c => !c.skipped).map(c => c.name);
    }
  );

export const makeDataVarsSampleSelector = () =>
  createSelector(
    dataEntitiesSelector,
    dataValuesSelector,
    (state, id) => id,
    (entities, valueEntites, id) => {
      const entity = entities[id];
      if (!entity) {
        return null;
      }
      const samplePage = valueEntites[id].pages[0];
      if (!samplePage) {
        return null;
      }
      return entity.columns.reduce((all, col, index) => {
        if (col.skipped) {
          return all;
        }
        return { ...all, [col.name]: samplePage[0][index] };
      }, {});
    }
  );
