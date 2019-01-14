import { submitStateEffect } from '@expandorg/app-utils';

import {
  editEmailStateSelector,
  confirmEmailStateSelector,
  resendConfirmEmailStateSelector,
} from '@expandorg/app-account/selectors';

export const ConfirmEmailEffect = submitStateEffect(confirmEmailStateSelector);
export const ResendEffect = submitStateEffect(resendConfirmEmailStateSelector);

export const EditEmailEffect = submitStateEffect(editEmailStateSelector);
