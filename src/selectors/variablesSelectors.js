// @flow
import { createSelector } from 'reselect';
import { userSelector } from '@expandorg/app-auth/selectors';

// eslint-disable-next-line import/prefer-default-export
export const defaultVariablesSelector: any = createSelector(
  userSelector,
  user => ({
    workerId: user.id,
  })
);
