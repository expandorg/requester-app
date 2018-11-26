import { BaseApi } from '@gemsorg/api-client';

export class TasksApi extends BaseApi {
  list = ({ status = '' }) => this.get(`/tasks/${status}`);

  fetchStats = ({ id }) => this.get(`/tasks/stats/${id}`);
}

export const tasksApi = new TasksApi();
