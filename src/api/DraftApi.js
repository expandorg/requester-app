import { BaseApi } from '@gemsorg/api-client';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/api/drafts/${id}`);

  create = ({ draft }) => this.post('/api/drafts', draft);

  patch = ({ id, params }) => this.patch(`/api/drafts/${id}`, params);

  publish = ({ id, schedule }) =>
    this.patch(`/api/drafts/${id}/publish`, { schedule });
}

export const draftApi = new DraftApi();
