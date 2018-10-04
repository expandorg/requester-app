import { BaseApi } from '@gemsorg/api-client';

export class AuthApi extends BaseApi {
  getCurrentUser = () => this.get('/auth');

  logout = () => this.post('/logout');
}

export const authApi = new AuthApi();
