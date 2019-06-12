import { settings } from '@expandorg/utils';

const appSettings = {
  ...settings,
  requesterApiUrl: process.env.REQUESTER_BACKEND_ADDRESS,
  inspectletId: process.env.INSPECTLET_ID,
};

export default appSettings;
