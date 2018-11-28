import { BaseApi } from '@gemsorg/api-client';
import apiClient from './apiClient';

export class TasksApi extends BaseApi {
  list = ({ status = '' }) => this.get(`/tasks/status/${status}`);

  fetchStats = ({ id }) => this.get(`/tasks/stats/${id}`);
}

export const tasksApi = new TasksApi(apiClient);
