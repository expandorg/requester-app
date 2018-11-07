import { BaseApi } from '@gemsorg/api-client';

export class DataApi extends BaseApi {
  uploadData = ({ draftId, data }) =>
    this.postForm(`/api/drafts/${draftId}/data`, { data });

  fetch = ({ draftId, dataId, page = 0 }) =>
    this.get(`/api/drafts/${draftId}/data/${dataId}`, { page });

  columns = ({ draftId, dataId, columns }) =>
    this.post(`/api/drafts/${draftId}/data/${dataId}/columns`, {
      columns,
    });
}

export const dataApi = new DataApi();
