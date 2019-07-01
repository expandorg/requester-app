// @flow
import type { Draft } from '../../model/types.flow';
import { DraftManager } from '../../model/draft';

export const WizardSteps = {
  Forms: 0,
  Data: 1,
  Settings: 2,
  // Whitelist: 3,
  Pay: 3,
  Summary: 4,
};

const getFundingStatus = (draft: ?Draft) => {
  return DraftManager.hasFunding(draft) ? 'complete' : 'required';
};

const getFormsStatus = (draft: ?Draft) => {
  return DraftManager.isFormsReviewed(draft) ? 'complete' : 'required';
};

// eslint-disable-next-line import/prefer-default-export
export const getNavState = (draft: Draft) => ({
  settings: {
    status: draft ? 'complete' : null,
    disabled: !draft,
  },
  data: {
    status: DraftManager.hasData(draft) ? 'complete' : null,
  },
  forms: {
    status: getFormsStatus(draft),
  },
  whitelist: {
    status: DraftManager.hasWhitelist(draft) ? 'complete' : null,
  },
  pay: {
    status: getFundingStatus(draft),
  },
});
