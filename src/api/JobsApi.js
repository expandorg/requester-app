// @flow
import { BaseApi } from '@expandorg/api-client';

export class JobsApi extends BaseApi {
  stats = ({ jobId }: { jobId: number }) => this.get(`/jobs/${jobId}/stats`);

  fetch = ({ jobId }: { jobId: number }) => this.get(`/jobs/${jobId}`);

  fetchResponses = ({ jobId, page = 0 }: { jobId: number, page: number }) =>
    this.get(`/jobs/${jobId}/responses`, { page });
}

export const jobsApi = new JobsApi();
