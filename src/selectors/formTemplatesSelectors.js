// @flow
import { createSelector } from 'reselect';

export const formTemplatesEntitiesSelector = (state: Object) =>
  state.formTemplates.entities;

export const formTemplatesListSelector = (state: Object) =>
  state.formTemplates.list;

export const formTemplatesSelector = createSelector(
  formTemplatesListSelector,
  formTemplatesEntitiesSelector,
  (list, entities) => list.map(id => entities[id])
);

export const makeTaskTemplateSelector = () =>
  createSelector(
    formTemplatesEntitiesSelector,
    (state, templateId) => templateId,
    (entities, id) => {
      if (id === null || id === undefined) {
        return null;
      }
      return entities[id];
    }
  );
