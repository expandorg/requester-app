// @flow
import { createSelector } from 'reselect';

export const formTemplatesEntitiesSelector = (state: Object) =>
  state.formTemplates.entities;

export const formTemplatesListSelector = (state: Object) =>
  state.formTemplates.list;

export const formTemplatesSelector: any = createSelector(
  formTemplatesListSelector,
  formTemplatesEntitiesSelector,
  (list, entities) => list.map(id => entities[id])
);
