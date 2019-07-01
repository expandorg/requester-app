import React, { useEffect, useMemo } from 'react';

import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RequestStates, matchProps, locationProps } from '@expandorg/app-utils';

import DraftWizard from './DraftWizard';

import LoadIndicator from '../shared/LoadIndicator';
import Page from '../shared/Page';
import { authenticated } from '../shared/auth';

import {
  makeDraftSelector,
  draftSavingSelector,
  makeDraftErrorsSelector,
} from '../../selectors/draftsSelectors';
import { fetchDraftStateSelector } from '../../selectors/uiStateSelectors';
import { fetch } from '../../sagas/draftsSagas';

function Draft({ match, location }) {
  const dispatch = useDispatch();

  const draftSelector = useMemo(makeDraftSelector, []);
  const draft = useSelector(state => draftSelector(state, match.params.id));

  const isSaving = useSelector(draftSavingSelector);
  const loadState = useSelector(fetchDraftStateSelector);

  const errorsSelector = useMemo(makeDraftErrorsSelector, []);
  const errorState = useSelector(errorsSelector);

  useEffect(() => {
    dispatch(fetch(match.params.id));
  }, [dispatch, match.params.id]);

  const isLoading = !draft && loadState.state === RequestStates.Fetching;
  const title = (draft && draft.name) || '';
  const tab = (location.state && location.state.tab) || 0;
  return (
    <Page title={title} sidebar={false} navbar={false} footer={false}>
      <LoadIndicator isLoading={isLoading}>
        {!!draft && (
          <DraftWizard
            draft={draft}
            isSaving={isSaving}
            tab={tab}
            errorState={errorState}
          />
        )}
      </LoadIndicator>
    </Page>
  );
}

Draft.propTypes = {
  match: matchProps.isRequired,
  location: locationProps.isRequired,
};

export default withRouter(authenticated(Draft));
