// @flow
import type { Draft } from '../../model/types.flow';
import { DraftManager } from '../../model/draft';

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
export const getNavState = (draft: Draft) => {
  const hasTemplate = DraftManager.hasTemplate(draft);
  return {
    settings: {
      status: draft ? 'complete' : null,
      disabled: !draft,
    },
    upload: {
      status: DraftManager.hasData(draft) ? 'complete' : null,
      disabled: !draft,
    },
    templates: {
      status: getTemplateStatus(draft),
      disabled: !draft,
    },
    task: {
      status: getFormsStatus(draft),
      disabled: !hasTemplate,
    },
    whitelist: {
      status: DraftManager.hasWhitelist(draft) ? 'complete' : null,
      disabled: !hasTemplate,
    },
    pay: {
      status: getFundingStatus(draft),
      disabled: !hasTemplate,
    },
  };
};
