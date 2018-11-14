// @flow
import { createSelector } from 'reselect';

export const taskTemplatesEntitiesSelector = (state: Object) =>
  state.taskTemplates.entities;

export const taskTemplatesListSelector = (state: Object) =>
  state.taskTemplates.list;

export const taskTemplatesSelector = createSelector(
  taskTemplatesListSelector,
  taskTemplatesEntitiesSelector,
  (list, entities) => list.map(id => entities[id])
);

export const makeTaskTemplateSelector = () =>
  createSelector(
    taskTemplatesEntitiesSelector,
    (state, templateId) => templateId,
    (entities, id) => {
      if (id === null || id === undefined) {
        return null;
      }
      return entities[id];
    }
  );
