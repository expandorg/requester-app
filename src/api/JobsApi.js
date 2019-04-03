// @flow
import { BaseApi } from '@expandorg/api-client';

export class JobsApi extends BaseApi {
  stats = ({ jobId }: { jobId: number }) => this.get(`/jobs/${jobId}/stats`);
}

export const jobsApi = new JobsApi();
