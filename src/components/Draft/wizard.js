// @flow
import type { Draft } from '../../model/types.flow';
import { DraftManager } from '../../model/draft';

export const WizardSteps = {
  Templates: 0,
  Settings: 1,
  Data: 2,
  Forms: 3,
  // Whitelist: 4,
  Pay: 4,
  Summary: 5,
};

const getTemplateStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  return DraftManager.hasTemplate(draft) ? 'complete' : 'required';
};

const getFundingStatus = (draft: ?Draft) => {
  if (!DraftManager.hasTemplate(draft)) {
    return null;
  }
  return DraftManager.hasFunding(draft) ? 'complete' : 'required';
};

const getFormsStatus = (draft: ?Draft) => {
  if (!DraftManager.hasTemplate(draft)) {
    return null;
  }
  return DraftManager.isFormsReviewed(draft) ? 'complete' : 'required';
};

// eslint-disable-next-line import/prefer-default-export
export const getNavState = (draft: Draft) => ({
  templates: {
    status: getTemplateStatus(draft),
    disabled: !draft,
  },
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
