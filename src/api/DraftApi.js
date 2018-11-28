import { BaseApi } from '@gemsorg/api-client';
import apiClient from './apiClient';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/drafts/${id}`);

  create = ({ draft }) => this.post('/drafts', draft);

  update = ({ id, params }) => this.patch(`/drafts/${id}`, params);

  publish = ({ id }) => this.post(`/drafts/${id}/publish`);
}

export const draftApi = new DraftApi(apiClient);
