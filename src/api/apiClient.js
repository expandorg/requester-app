import { ApiClient, ApiRequest } from '@expandorg/api-client';

import settings from '../common/settings';

const apiClient = new ApiClient(settings.requesterApiUrl, new ApiRequest());

export default apiClient;
