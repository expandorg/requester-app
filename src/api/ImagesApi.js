import { BaseApi } from '@gemsorg/api-client';
import apiClient from './apiClient';

export class ImagesApi extends BaseApi {
  upload = ({ thumbnail, cb }) =>
    this.uploadFile(`/thumbnails/upload`, 'thumbnail', thumbnail, cb);
}

export const imagesApi = new ImagesApi(apiClient);
