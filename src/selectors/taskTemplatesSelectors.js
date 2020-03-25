// @flow
import { createSelector } from 'reselect';

export const taskTemplatesEntitiesSelector = (state: Object) =>
  state.taskTemplates.entities;

export const taskTemplatesListSelector = (state: Object) =>
  state.taskTemplates.list;

export const taskTemplatesSelector: any = createSelector(
  taskTemplatesListSelector,
  taskTemplatesEntitiesSelector,
  (list, entities) => list.map((id) => entities[id])
);

export const makeTaskTemplateSelector = (): any =>
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

export const makeDraftFromTemplateSelector = (): any => {
  const templateSelector = makeTaskTemplateSelector();
  return createSelector(templateSelector, (template) => {
    if (!template) {
      return null;
    }
    return { ...template };
  });
};
