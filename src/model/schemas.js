// @flow
import { schema } from 'normalizr';

const draftSchema = new schema.Entity('drafts');

const taskSchema = new schema.Entity('tasks');
const dataSchema = new schema.Entity('data');

const authResponseSchema = {};

const draftResponseSchema = { draft: draftSchema };

const dataResponseSchema = { data: dataSchema };

export {
  draftSchema,
  taskSchema,
  draftResponseSchema,
  authResponseSchema,
  dataResponseSchema,
};
