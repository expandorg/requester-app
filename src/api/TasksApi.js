import { BaseApi } from '@gemsorg/api-client';

export class TasksApi extends BaseApi {
  list = ({ status }) => this.get(`/api/requesters/tasks/${status}`);
}

export const tasksApi = new TasksApi();
