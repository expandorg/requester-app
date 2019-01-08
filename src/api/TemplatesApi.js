import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class TemplatesApi extends BaseApi {
  taskTemplates = () => this.get('/tasks/templates');

  taskTemplate = ({ id }) => this.get(`/tasks/templates/${id}`);

  formTemplates = () => this.get('/forms/templates');

  formTemplate = ({ id }) => this.get(`/forms/templates/${id}`);
}

export const templatesApi = new TemplatesApi(apiClient);
