// @flow

import bodyParser from 'body-parser';
import { tasks, taskTemplates } from './tasksRepo';

import { dataRepo, dataUpload, createData } from './dataRepos';

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

const draftsRepo = tasks
  .filter(t => t.state === 'draft')
  .reduce((all, d) => ({ ...all, [d.id]: d }), {});

export default function setupMocks(app: Object) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/api/v1/tasks/list/:status*?', (req, res) => {
    const { status } = req.params;

    res.json({
      tasks: tasks.filter(t => !status || t.state === status),
    });
  });

  app.post('/api/v1/drafts', (req, res) => {
    const draft = {
      id: tasks.length,
      state: 'draft',
      ...req.body,
    };
    tasks.push(draft);
    draftsRepo[+draft.id] = draft;

    setTimeout(() => {
      res.json({ draft });
    }, 1000);
  });

  app.patch('/api/v1/drafts/:id', (req, res) => {
    const draft = {
      ...draftsRepo[+req.params.id],
      ...req.body,
    };
    draftsRepo[+req.params.id] = draft;
    if (req.body.templateId) {
      setTimeout(() => {
        res.json({ draft });
      }, 1000);
    } else {
      res.json({ draft });
    }
  });

  app.get('/api/v1/drafts/:id', (req, res) => {
    res.json({
      draft: draftsRepo[req.params.id],
    });
  });

  app.post('/api/v1/drafts/:id/data', dataUpload.single('data'), (req, res) => {
    const draft = draftsRepo[+req.params.id];

    dataRepo[draft.id] = createData(draft.id, draft.id);
    draft.dataId = draft.id;

    res.json({
      draft,
    });
  });

  app.get('/api/v1/drafts/:id/data/:dataId', (req, res) => {
    const current = +req.query.page || 0;
    const data = dataRepo[+req.params.id];

    const [values, pagination] = getPage(data.values, current, 10);

    res.json({
      data: { ...data, values },
      pagination,
    });
  });

  app.post('/api/v1/drafts/:id/data/:dataId/columns', (req, res) => {
    const data = dataRepo[+req.params.id];
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

  app.get('/api/v1/tasks/templates', (req, res) => {
    res.json({
      templates: taskTemplates,
    });
  });

  app.post('/api/v1/whitelist/eligible', (req, res) => {
    const { conditions } = req.body;
    res.json({
      users: Math.max(1000 - 100 * conditions.length, 0),
    });
  });
}
