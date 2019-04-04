// @flow
import { createSelector } from 'reselect';

export const jobResponsesStateSelecor = (state: Object) => state.jobResponses;

export const dataEntitiesSelector: any = createSelector(
  jobResponsesStateSelecor,
  state => state.entities
);

// export const dataValuesSelector: any = createSelector(
//   jobResponsesStateSelecor,
//   state => state.values
// );

export const makeJobResponsesDataSelector = (): any =>
  createSelector(
    dataEntitiesSelector,
    // dataValuesSelector,
    (state, id) => id,
    (state, id, page) => page,
    (entities, id, page) => {
      const jobResults = entities[id];
      if (!jobResults) {
        return null;
      }
      return jobResults[+page || 0] || null;
    }
  );
