import { settings } from '@gemsorg/utils';

const appSettings = {
  ...settings,
  requesterApiUrl: process.env.REQUESTER_BACKEND_ADDRESS,
};

export default appSettings;
