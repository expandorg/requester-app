// @flow

const getSettingsStatus = (draft: ?Object) => {
  if (!draft) {
    return null;
  }
  return 'complete';
};

export const hasTemplate = (draft: ?Object) =>
  draft && draft.templateId !== null && draft.templateId !== undefined;

export const hasWhitelist = (draft: ?Object) =>
  draft && draft.whitelist !== null && draft.whitelist !== undefined;

export const hasFunding = (draft: ?Object) =>
  draft && draft.funding !== null && draft.funding !== undefined;

const getWhitelistStatus = (draft: ?Object) => {
  if (hasWhitelist(draft)) {
    return 'complete';
  }
  return null;
};

const getTemplateStatus = (draft: ?Object) => {
  if (!draft) {
    return null;
  }
  if (hasTemplate(draft)) {
    return 'complete';
  }
  return 'required';
};

const getFundingStatus = (draft: ?Object) => {
  if (!draft || !hasTemplate(draft)) {
    return null;
  }
  if (hasFunding(draft)) {
    return 'complete';
  }
  return 'required';
};

const getUploadStatus = (draft: ?Object) => {
  if (!draft) {
    return null;
  }
  if (draft.dataId !== null && draft.dataId !== undefined) {
    return 'complete';
  }
  return null;
};

export const getNavState = (draft: Object) => { // eslint-disable-line
  const t = hasTemplate(draft);
  return {
    settings: { status: getSettingsStatus(draft), disabled: !draft },
    upload: { status: getUploadStatus(draft), disabled: !draft },
    templates: { status: getTemplateStatus(draft), disabled: !draft },
    task: { status: null, disabled: !t },
    whitelist: { status: getWhitelistStatus(draft), disabled: !t },
    pay: { status: getFundingStatus(draft), disabled: !t },
  };
};

export const isDraftReady = (draft: Object) => {
  if (!hasTemplate(draft)) {
    return false;
  }

  if (!hasFunding(draft)) {
    return false;
  }
  return true;
};
