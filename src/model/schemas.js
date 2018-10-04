// @flow
import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');

const taskSchema = new schema.Entity('tasks');

const authResponseSchema = {};

export { jobSchema, taskSchema, authResponseSchema };
