// @flow
import type { Draft } from '../../model/types.flow';
import { DraftManager } from '../../model/draft';

const getSettingsStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  return 'complete';
};

const getWhitelistStatus = (draft: ?Object) =>
  DraftManager.hasWhitelist(draft) ? 'complete' : null;

const getTemplateStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  return DraftManager.hasTemplate(draft) ? 'complete' : 'required';
};

const getFundingStatus = (draft: ?Draft) => {
  if (!draft || !DraftManager.hasTemplate(draft)) {
    return null;
  }
  return DraftManager.hasFunding(draft) ? 'complete' : 'required';
};

const getUploadStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  return DraftManager.hasData(draft) ? 'complete' : null;
};

export const getNavState = (draft: Draft) => { // eslint-disable-line
  const t = DraftManager.hasTemplate(draft);
  return {
    settings: {
      status: getSettingsStatus(draft),
      disabled: !draft,
    },
    upload: {
      status: getUploadStatus(draft),
      disabled: !draft,
    },
    templates: {
      status: getTemplateStatus(draft),
      disabled: !draft,
    },
    task: {
      status: null,
      disabled: !t,
    },
    whitelist: {
      status: getWhitelistStatus(draft),
      disabled: !t,
    },
    pay: {
      status: getFundingStatus(draft),
      disabled: !t,
    },
  };
};
