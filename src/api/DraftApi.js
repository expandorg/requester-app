import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/drafts/${id}`);

  create = ({ templateId }) => this.post('/drafts', { templateId });

  updateSettings = ({ id, settings }) =>
    this.post(`/drafts/${id}/settings`, settings);

  updateVariables = ({ id, variables }) =>
    this.post(`/drafts/${id}/variables`, { variables });

  updateVerificationSettings = ({ id, settings }) =>
    this.post(`/drafts/${id}/verification`, settings);

  updateTaskForm = ({ id, form }) =>
    this.post(`/drafts/${id}/task/form`, { taskForm: form });

  updateVerificationForm = ({ id, form }) =>
    this.post(`/drafts/${id}/verification/form`, { verificationForm: form });

  updateOnboarding = ({ id, onboarding }) =>
    this.post(`/drafts/${id}/onboarding`, { onboarding });

  updateFunding = ({ id, funding }) =>
    this.post(`/drafts/${id}/funding`, { funding });

  updateWhitelist = ({ id, whitelist }) =>
    this.post(`/drafts/${id}/whitelist`, { whitelist });

  publish = ({ id, schedule }) =>
    this.post(`/drafts/${id}/prepublish`, { schedule });

  remove = ({ id }) => this.delete(`/drafts/${id}`);

  copy = ({ id }) => this.post(`/drafts/${id}/copy`);
}

export const draftApi = new DraftApi(apiClient);
