// @flow

import bodyParser from 'body-parser';
import nanoid from 'nanoid';
import {
  tasks,
  getDashboardTask,
  createTask,
  drafts,
  getDashboardDraft,
  taskTemplates,
  formTemplates,
  copyDraft,
} from './tasksRepo';

import { dataRepo, dataUpload, createData } from './dataRepos';

const files = {};

const getPage = (array, page, pageSize = 10) => {
  const from = (page || 0) * pageSize;
  const to = from + pageSize;
  const result = array.filter((ins, index) => index >= from && index < to);
  const pagination = {
    current: page,
    total: Math.ceil(array.length / pageSize),
  };
  return [result, pagination];
};

export default function setupMocks(app: Object) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // TASKS
  // TEMPLATES
  app.get('/api/v1/tasks/templates', (req, res) => {
    res.json({
      templates: taskTemplates,
    });
  });

  app.get('/api/v1/tasks/templates/:id', (req, res) => {
    const template = taskTemplates.find(t => t.id === req.params.id);
    res.json({
      template,
    });
  });

  app.get('/api/v1/tasks/stats/:id', (req, res) => {
    const { id } = req.params;

    res.json({
      task: tasks.find(t => t.id === +id),
    });
  });

  app.get('/api/v1/tasks/status/:status*?', (req, res) => {
    const { status } = req.params;
    const array = [
      ...drafts.map(getDashboardDraft),
      ...tasks.map(getDashboardTask),
    ];

    res.json({
      tasks: array.filter(t => !status || t.status === status),
    });
  });

  // DRAFTS
  app.get('/api/v1/drafts/:id', (req, res) => {
    res.json({
      draft: drafts.find(d => d.id === req.params.id),
    });
  });

  app.post('/api/v1/drafts', (req, res) => {
    const draft = {
      id: nanoid(),
      ...req.body,
    };
    drafts.push(draft);

    setTimeout(() => {
      res.json({ draft });
    }, 1000);
  });

  app.patch('/api/v1/drafts/:id', (req, res) => {
    const index = drafts.findIndex(d => d.id === req.params.id);
    const draft = {
      ...drafts[index],
      ...req.body,
    };
    drafts[index] = draft;
    res.json({ draft });
  });

  app.post('/api/v1/drafts/:id/template', (req, res) => {
    const index = drafts.findIndex(d => d.id === req.params.id);
    let draft = drafts[index];

    const { templateId, settings } = req.body;

    const {
      taskForm,
      onboarding,
      verificationForm,
      logic,
    } = taskTemplates.find(t => t.id === templateId);

    draft = {
      ...draft,
      taskForm,
      verificationForm,
      logic,
      ...settings,
      templateId,
      onboarding: {
        ...onboarding,
        ...settings.onboarding,
      },
    };
    drafts[index] = draft;

    setTimeout(() => {
      res.json({ draft });
    }, 1000);
  });

  app.delete('/api/v1/drafts/:id', (req, res) => {
    const index = drafts.findIndex(d => d.id === req.params.id);
    drafts.splice(index, 1);
    res.json({ draftId: req.params.id });
  });

  app.post('/api/v1/drafts/:id/data', dataUpload.single('data'), (req, res) => {
    const draft = drafts.find(d => d.id === req.params.id);

    files[123] = req.file;

    dataRepo[draft.id] = createData(draft.id, draft.id);
    draft.dataId = draft.id;

    res.json({
      draft,
    });
  });

  app.post('/api/v1/drafts/:id/copy', (req, res) => {
    const draft = drafts.find(d => d.id === req.params.id);
    const copy = copyDraft(draft);
    draft.unshift(copy);
    res.json({
      draft: copy,
    });
  });

  app.post('/api/v1/drafts/:id/onboarding', (req, res) => {
    const draft = drafts.find(d => d.id === req.params.id);
    draft.onboarding = req.body.onboarding;
    res.json({
      draft,
    });
  });

  app.post('/api/v1/drafts/:id/publish', (req, res) => {
    const index = drafts.findIndex(d => d.id === req.params.id);
    const draft = drafts[index];
    const task = createTask(draft);

    draft.taskId = task.id;
    draft.status = 'published';

    drafts.splice(index, 1);

    tasks.unshift(task);

    setTimeout(() => {
      res.json({ draft });
    }, 1000);
  });

  // DATA
  app.get('/api/v1/drafts/:id/data/:dataId', (req, res) => {
    const current = +req.query.page || 0;
    const data = dataRepo[req.params.id];

    const [values, pagination] = getPage(data.values, current, 10);

    setTimeout(() => {
      res.json({
        data: { ...data, values },
        pagination,
      });
    }, 1000);
  });

  app.post('/api/v1/drafts/:id/data/:dataId/columns', (req, res) => {
    const data = dataRepo[req.params.id];
    data.columns = req.body.columns;
    const { columns, id, draftId } = data;
    res.json({
      data: {
        id,
        draftId,
        columns,
      },
    });
  });

  app.get('/api/v1/forms/templates', (req, res) => {
    res.json({
      templates: formTemplates,
    });
  });

  app.get('/api/v1/forms/templates/:id', (req, res) => {
    const template = formTemplates.find(t => t.id === req.params.id);
    res.json({
      template,
    });
  });

  // WHITELIST
  app.post('/api/v1/whitelist/eligible', (req, res) => {
    const { conditions } = req.body;
    res.json({
      users: Math.max(1000 - 100 * conditions.length, 0),
    });
  });

  // thumbnails
  app.get('/api/v1/thumbnails/:fileName', (req, res) => {
    const { fileName } = req.params;
    const f = files[fileName];
    res.set({
      'content-type': f.mimetype,
      'content-length': f.size,
    });
    res.send(f.buffer);
  });

  app.post(
    '/api/v1/thumbnails/upload/',
    dataUpload.single('thumbnail'),
    (req, res) => {
      const id = nanoid();
      const imageUrl = `/api/v1/thumbnails/${id}`;

      files[id] = req.file;

      res.json({
        imageUrl,
      });
    }
  );
}
