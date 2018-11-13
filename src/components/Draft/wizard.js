// @flow

const getSettingsStatus = (draft: ?Object) => {
  if (!draft) {
    return null;
  }
  return 'complete';
};

export const hasTemplate = (draft: ?Object) =>
  draft && draft.templateId !== null && draft.templateId !== undefined;

const getTemplateStatus = (draft: ?Object) => {
  if (!draft) {
    return null;
  }
  if (hasTemplate(draft)) {
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
    whitelist: { status: null, disabled: !t },
    pay: { status: null, disabled: !t },
  };
};
