// @flow
import { BaseApi } from '@expandorg/api-client';

export class JobReportsApi extends BaseApi {
  fetchReports = ({ jobId }: { jobId: number }) =>
    this.get(`/jobs/${jobId}/reports`);
}

export const jobReportsApi = new JobReportsApi();
