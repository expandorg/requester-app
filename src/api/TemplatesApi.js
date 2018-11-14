import { BaseApi } from '@gemsorg/api-client';

export class TemplatesApi extends BaseApi {
  taskTemplates = () => this.get('/tasks/templates');

  taskTemplate = ({ id }) => this.get(`/tasks/templates/${id}`);

  onboardingTemplates = () => this.get('/onboarding/templates');

  onboardingTemplate = ({ id }) => this.get(`/onboarding/templates/${id}`);
}

export const templatesApi = new TemplatesApi();
