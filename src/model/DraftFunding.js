// @flow

import { validateForm, rules } from '@expandorg/validation';
import { gt } from './validation';

import { type Draft } from './types.flow';
import { DraftStatus } from './enums';

export default class DraftFunding {
  static rules = {
    balance: [[rules.isNumber, 'Should be a positive number'], gt(0)],
    reward: [[rules.isNumber, 'Should be a positive number'], gt(0)],
  };

  static getFundingRequestParams(
    draft: Draft,
    user: Object,
    balance: string,
    reward: string
  ) {
    const funding = {
      ...draft.funding,
      balance: +balance,
      reward: +reward,
    };

    const errors = validateForm({ balance, reward }, DraftFunding.rules);
    if (errors) {
      return [null, errors];
    }
    if (user.gems.balance < balance) {
      return [null, { insufficent: true }];
    }
    return [funding, null];
  }
  static balanceIsReadonly(draft: Draft) {
    return draft.status !== DraftStatus.draft;
  }
}
