// @flow
import { BaseApi } from '@expandorg/api-client';

export class JobsApi extends BaseApi {
  stats = ({ jobId }: { jobId: number }) => this.get(`/jobs/${jobId}/stats`);

  fetch = ({ jobId }: { jobId: number }) => this.get(`/jobs/${jobId}`);

  fetchAcceptedResponses = ({
    jobId,
    page = 0,
  }: {
    jobId: number,
    page: number,
  }) => this.get(`/jobs/${jobId}/responses`, { page });

  fetchPendingResponses = ({ jobId }: { jobId: number }) =>
    this.get(`/jobs/${jobId}/responses/pending`);
}

export const jobsApi = new JobsApi();
