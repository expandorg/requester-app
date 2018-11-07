import { BaseApi } from '@gemsorg/api-client';

export class WhitelistApi extends BaseApi {
  eligible = ({ conditions }) =>
    this.get(`/whitelist/eligible`, { conditions });
}

export const whitelistApi = new WhitelistApi();
