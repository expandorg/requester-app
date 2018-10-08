import { BaseApi } from '@gemsorg/api-client';

export class TasksApi extends BaseApi {
  fetch = ({ category }) => {
    console.log(category);
    return this.success({ tasks: [] });
  };
}

export const tasksApi = new TasksApi();
