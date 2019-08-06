import { validateForm, rules } from '@expandorg/validation';

const validation = {
  name: [
    [rules.isRequired, 'Title is required'],
    [x => x && x.length <= 40, 'Title can be a maximum of 40 characters'],
  ],
  description: [[rules.isRequired, 'Description is required']],
};

export const validate = s => validateForm(s, validation);

export const getInitialState = draft => {
  const { funding } = draft;

  return {
    name: draft.name || '',
    description: draft.description || '',
    staking: !!funding.requirement,
    stake: `${funding.requirement || 0}`,
    callbackUrl: (draft && draft.callbackUrl) || '',
  };
};

export const getSettings = settings => ({
  ...settings,
  stake: +settings.stake,
});
