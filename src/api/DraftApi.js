import { BaseApi } from '@expandorg/api-client';
import apiClient from './apiClient';

export class DraftApi extends BaseApi {
  fetch = ({ id }) => this.get(`/drafts/${id}`);

  create = ({ templateId }) => this.post('/drafts', { templateId });

  template = ({ id, templateId }) =>
    this.post(`/drafts/${id}/template`, { templateId });

  updateSettings = ({ id, settings }) =>
    this.post(`/drafts/${id}/settings`, settings);

  updateVerificationSettings = ({ id, settings }) =>
    this.post(`/drafts/${id}/verification`, settings);

  updateTaskForm = ({ id, taskForm }) =>
    this.post(`/drafts/${id}/task/form`, { taskForm });

  updateVerificationForm = ({ id, verificationForm }) =>
    this.post(`/drafts/${id}/verification/form`, { verificationForm });

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
