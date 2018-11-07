import { BaseApi } from '@gemsorg/api-client';

export class DataApi extends BaseApi {
  uploadData = ({ draftId, data }) =>
    this.postForm(`/drafts/${draftId}/data`, { data });

  fetch = ({ draftId, dataId, page = 0 }) =>
    this.get(`/drafts/${draftId}/data/${dataId}`, { page });

  columns = ({ draftId, dataId, columns }) =>
    this.post(`/drafts/${draftId}/data/${dataId}/columns`, {
      columns,
    });
}

export const dataApi = new DataApi();
