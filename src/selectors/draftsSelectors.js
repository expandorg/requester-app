// @flow
import { createSelector } from 'reselect';
import DraftValidator from '../model/DraftValidator';

export const draftsStateSelector = (state: Object) => state.drafts;

export const draftsEntitiesSelector: any = createSelector(
  draftsStateSelector,
  state => state.entities
);

export const makeDraftSelector = (): any =>
  createSelector(
    draftsEntitiesSelector,
    (state, id) => id,
    (entities, id) => entities[id]
  );

export const draftSavingSelector = (state: Object) => state.drafts.saving;

export const makeDraftValidationSelector = (): any => {
  const draftSelector = makeDraftSelector();
  const validator = new DraftValidator();
  return createSelector(
    draftSelector,
    draft => validator.validate(draft)
  );
};
