import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/drafts/${id}`);

  create = ({ draft }) => this.post('/drafts', draft);

  update = ({ id, params }) => this.patch(`/drafts/${id}`, params);

  template = ({ id, templateId, settings }) =>
    this.post(`/drafts/${id}/template`, { templateId, settings });

  publish = ({ id, schedule }) =>
    this.post(`/drafts/${id}/publish`, { schedule });

  remove = ({ id }) => this.delete(`/drafts/${id}`);

  copy = ({ id }) => this.post(`/drafts/${id}/copy`);
}

export const draftApi = new DraftApi(apiClient);
