import { BaseApi } from '@gemsorg/api-client';
import apiClient from './apiClient';

export class WhitelistApi extends BaseApi {
  eligible = ({ conditions }) =>
    this.post(`/whitelist/eligible`, { conditions });
}

export const whitelistApi = new WhitelistApi(apiClient);
