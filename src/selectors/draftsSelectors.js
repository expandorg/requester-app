// @flow
import { createSelector } from 'reselect';

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

const valid = {
  onboardingForms: null,
  taskForm: null,
  verificationForm: null,
};

export const makeDraftValidationSelector = (): any => {
  const draftSelector = makeDraftSelector();
  return createSelector(
    draftSelector,
    draft => {
      if (!draft) {
        return valid;
      }
      return {};
    }
  );
};
