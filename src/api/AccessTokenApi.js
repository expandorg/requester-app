import { BaseApi } from '@expandorg/api-client';

export class AccessTokenApi extends BaseApi {
  generateKey = ({ userId }) => this.post(`/users/${userId}/api-key`);
}

export const accessTokenApi = new AccessTokenApi();
