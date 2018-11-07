import { BaseApi } from '@gemsorg/api-client';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/drafts/${id}`);

  create = ({ draft }) => this.post('/drafts', draft);

  patch = ({ id, params }) => this.patch(`/drafts/${id}`, params);

  publish = ({ id, schedule }) =>
    this.patch(`/drafts/${id}/publish`, { schedule });
}

export const draftApi = new DraftApi();
