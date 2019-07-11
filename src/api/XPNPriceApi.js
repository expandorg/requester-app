import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class XPNPriceApi extends BaseApi {
  fetchPrice = () => this.get(`/token/price`);
}

export const priceApi = new XPNPriceApi(apiClient);
