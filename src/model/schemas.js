// @flow
import { schema } from 'normalizr';

const draftSchema = new schema.Entity('drafts');

const taskStatsSchema = new schema.Entity('taskStats');
const taskTemplateSchema = new schema.Entity('taskTemplates');
const formTemplateSchema = new schema.Entity('formTemplates');

const dataSchema = new schema.Entity('data');

const authResponseSchema = {};

const draftResponseSchema = { draft: draftSchema };

const dataResponseSchema = { data: dataSchema };

export {
  draftSchema,
  taskStatsSchema,
  draftResponseSchema,
  authResponseSchema,
  dataResponseSchema,
  taskTemplateSchema,
  formTemplateSchema,
};
