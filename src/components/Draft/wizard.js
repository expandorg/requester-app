// @flow
import type { Draft } from '../../model/types.flow';

const getSettingsStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  return 'complete';
};

export const hasTemplate = (draft: ?Draft) =>
  draft && draft.templateId !== null && draft.templateId !== undefined;

export const hasWhitelist = (draft: ?Draft) =>
  draft && draft.whitelist !== null && draft.whitelist !== undefined;

export const hasFunding = (draft: ?Draft) =>
  draft && draft.funding && typeof draft.funding.reward !== 'undefined';

export const hasData = (draft: ?Draft) =>
  draft && draft.dataId !== null && draft.dataId !== undefined;

// const getWhitelistStatus = (draft: ?Object) => {
//   if (hasWhitelist(draft)) {
//     return 'complete';
//   }
//   return null;
// };

const getTemplateStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  if (hasTemplate(draft)) {
    return 'complete';
  }
  return 'required';
};

const getFundingStatus = (draft: ?Draft) => {
  if (!draft || !hasTemplate(draft)) {
    return null;
  }
  if (hasFunding(draft)) {
    return 'complete';
  }
  return 'required';
};

const getUploadStatus = (draft: ?Draft) => {
  if (!draft) {
    return null;
  }
  if (hasData(draft)) {
    return 'complete';
  }
  return null;
};

export const getNavState = (draft: Draft) => { // eslint-disable-line
  const t = hasTemplate(draft);
  return {
    settings: { status: getSettingsStatus(draft), disabled: !draft },
    upload: { status: getUploadStatus(draft), disabled: !draft },
    templates: { status: getTemplateStatus(draft), disabled: !draft },
    task: { status: null, disabled: !t },
    // whitelist: { status: getWhitelistStatus(draft), disabled: !t },
    pay: { status: getFundingStatus(draft), disabled: !t },
  };
};

export const isDraftReady = (draft: Draft) => {
  if (!hasTemplate(draft)) {
    return false;
  }
  if (!hasFunding(draft)) {
    return false;
  }
  return true;
};
