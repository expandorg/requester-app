// @flow
import { schema } from 'normalizr';

const draftSchema = new schema.Entity('drafts');

const taskSchema = new schema.Entity('tasks');

const authResponseSchema = {};

export { draftSchema, taskSchema, authResponseSchema };
