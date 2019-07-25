// @flow
import { settings } from '@expandorg/utils';

const appSettings = {
  ...settings,
  requesterApiUrl: process.env.REQUESTER_BACKEND_ADDRESS,
  frontendUrl: process.env.FRONTEND_ADDRESS,
  inspectletId: process.env.INSPECTLET_ID,
};

export default appSettings;
