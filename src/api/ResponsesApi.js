// @flow
import { BaseApi } from '@expandorg/api-client';

export class ResponsesApi extends BaseApi {
  bulkVerify = ({ jobId, results }: Object) =>
    this.post(`/requesters/${jobId}/verify`, results);
}

export const responsesApi = new ResponsesApi();
