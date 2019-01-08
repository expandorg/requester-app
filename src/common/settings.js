import { settings } from '@expandorg/utils';

const appSettings = {
  ...settings,
  requesterApiUrl: process.env.REQUESTER_BACKEND_ADDRESS,
};

export default appSettings;
