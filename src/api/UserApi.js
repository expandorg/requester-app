import { BaseApi } from '@gemsorg/api-client';

export class UserApi extends BaseApi {
  assignAddress = ({ userId, address, signature }) =>
    this.post(`/users/${userId}/address`, { address, signature });

  editEmail = ({ userId, email }) =>
    this.post(`/users/${userId}/email`, { email });

  changePassword = ({ userId, newPassword, oldPassword }) =>
    this.post(`/users/${userId}/password`, { newPassword, oldPassword });
}

export const userApi = new UserApi();
