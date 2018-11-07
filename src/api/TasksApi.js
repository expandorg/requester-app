import { BaseApi } from '@gemsorg/api-client';

export class TasksApi extends BaseApi {
  list = ({ status = '' }) => this.get(`/tasks/list/${status}`);
}

export const tasksApi = new TasksApi();
