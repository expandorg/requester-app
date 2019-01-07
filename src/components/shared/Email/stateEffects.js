import { submitStateEffect } from '../../common/submitStateEffect';

import {
  editEmailStateSelector,
  confirmEmailStateSelector,
  resendConfirmEmailStateSelector,
} from '../../../selectors/uiStateSelectors';

export const ConfirmEmailEffect = submitStateEffect(confirmEmailStateSelector);
export const ResendEffect = submitStateEffect(resendConfirmEmailStateSelector);

export const EditEmailEffect = submitStateEffect(editEmailStateSelector);
