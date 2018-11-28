import { BaseApi } from '@gemsorg/api-client';
import apiClient from './apiClient';

export class DataApi extends BaseApi {
  uploadData = ({ draftId, data, xhrCallbacks }) =>
    this.uploadFile(`/drafts/${draftId}/data`, 'data', data, xhrCallbacks);

  fetch = ({ draftId, dataId, page = 0 }) =>
    this.get(`/drafts/${draftId}/data/${dataId}`, { page });

  columns = ({ draftId, dataId, columns }) =>
    this.post(`/drafts/${draftId}/data/${dataId}/columns`, {
      columns,
    });
}

export const dataApi = new DataApi(apiClient);
