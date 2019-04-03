import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class DashboardApi extends BaseApi {
  list = ({ status = '' }) => this.get(`/tasks/status/${status}`);
}

export const dashboardApi = new DashboardApi(apiClient);
