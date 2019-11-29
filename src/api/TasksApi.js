// @flow
import { BaseApi } from '@expandorg/api-client';

export class TasksApi extends BaseApi {
  fetch = ({ taskId }: { taskId: number }) => this.get(`/tasks/${taskId}`);
}

export const tasksApi = new TasksApi();
