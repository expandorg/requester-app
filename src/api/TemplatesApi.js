import { BaseApi } from '@gemsorg/api-client';

export class TemplatesApi extends BaseApi {
  taskTemplates = () => this.get('/api/task/templates');

  onboardingTemplates = () => this.get('/api/onboarding/templates');

  onboardingTemplate = ({ id }) => this.get(`/api/onboarding/templates/${id}`);
}

export const templatesApi = new TemplatesApi();
