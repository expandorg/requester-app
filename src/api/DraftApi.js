import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/drafts/${id}`);

  create = ({ templateId }) => this.post('/drafts', { templateId });

  update = ({ id, params }) => this.patch(`/drafts/${id}`, params);

  template = ({ id, templateId }) =>
    this.post(`/drafts/${id}/template`, { templateId });

  publish = ({ id, schedule }) =>
    this.post(`/drafts/${id}/prepublish`, { schedule });

  remove = ({ id }) => this.delete(`/drafts/${id}`);

  copy = ({ id }) => this.post(`/drafts/${id}/copy`);
}

export const draftApi = new DraftApi(apiClient);
