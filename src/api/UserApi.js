import { BaseApi } from '@expandorg/api-client';

export class UserApi extends BaseApi {
  assignAddress = ({ userId, address, signature }) =>
    this.post(`/users/${userId}/address`, { address, signature });

  editEmail = ({ userId, email }) =>
    this.post(`/users/${userId}/email`, { email });

  confirmEmail = ({ code, userId }) =>
    this.post('/email/confirm', { code, userId });

  resendConfirmEmail = ({ userId }) =>
    this.post(`/users/${userId}/email/resend`);

  changePassword = ({ userId, newPassword, oldPassword }) =>
    this.post(`/users/${userId}/password`, { newPassword, oldPassword });
}

export const userApi = new UserApi();
