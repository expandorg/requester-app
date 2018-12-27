import { BaseApi } from '@gemsorg/api-client';

export class UserApi extends BaseApi {
  assignAddress = ({ userId, address, signature }) =>
    this.post(`/users/${userId}/address`, { address, signature });
}

export const userApi = new UserApi();
