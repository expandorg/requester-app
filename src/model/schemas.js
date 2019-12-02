// @flow
import { schema } from 'normalizr';

const jobSchema = new schema.Entity('jobs');
const taskSchema = new schema.Entity('tasks');

const draftSchema = new schema.Entity('drafts');

const jobStatsSchema = new schema.Entity('jobStats');
const taskTemplateSchema = new schema.Entity('taskTemplates');
const formTemplateSchema = new schema.Entity('formTemplates');

const dataSchema = new schema.Entity('data');

const draftResponseSchema = { draft: draftSchema };

const dataResponseSchema = { data: dataSchema };

export {
  jobSchema,
  taskSchema,
  draftSchema,
  jobStatsSchema,
  draftResponseSchema,
  dataResponseSchema,
  taskTemplateSchema,
  formTemplateSchema,
};
