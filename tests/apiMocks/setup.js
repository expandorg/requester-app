// @flow

import bodyParser from 'body-parser';
import tasks from './tasksRepo';

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

    res.json({
      draft,
    });
  });

  app.patch('/api/v1/drafts/:id', (req, res) => {
    const draft = {
      ...draftsRepo[+req.params.id],
      ...req.body,
    };
    draftsRepo[+req.params.id] = draft;
    res.json({
      draft,
    });
  });

  app.get('/api/v1/drafts/:id', (req, res) => {
    res.json({
      draft: draftsRepo[req.params.id],
    });
  });
}
