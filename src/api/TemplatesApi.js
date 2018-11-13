import { BaseApi } from '@gemsorg/api-client';

export class TemplatesApi extends BaseApi {
  taskTemplates = () => this.get('/tasks/templates');

  onboardingTemplates = () => this.get('/onboarding/templates');

  onboardingTemplate = ({ id }) => this.get(`/onboarding/templates/${id}`);
}

export const templatesApi = new TemplatesApi();
