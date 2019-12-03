import { responsesActionTypes } from '../../sagas/actionTypes';

const setFetching = (state, jobId, isFetching) => {
  const byJob = state[jobId] || {};
  return { ...state, [jobId]: { ...byJob, isFetching } };
};

export default function acceptedResponsesReducer(state = {}, action) {
  switch (action.type) {
    case responsesActionTypes.FETCH_PENDING: {
      return setFetching(state, action.meta.params.jobId, true);
    }
    case responsesActionTypes.FETCH_PENDING_FAILED: {
      return setFetching(state, action.meta.params.jobId, false);
    }
    case responsesActionTypes.FETCH_PENDING_COMPLETE: {
      const { id, results } = action.payload;
      return { ...state, [id]: { isFetching: false, results } };
    }
    case responsesActionTypes.BULK_VERIFY_COMPLETE: {
      const { jobId, responseIds } = action.meta.params;
      const byJob = state[jobId];
      if (byJob) {
        const verified = new Set(responseIds);
        return {
          ...state,
          [jobId]: {
            ...byJob,
            results: byJob.results.filter(r => !verified.has(r.id)),
          },
        };
      }
      break;
    }
    default:
      break;
  }
  return state;
}
