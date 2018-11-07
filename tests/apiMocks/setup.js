// @flow

import tasks from './tasksRepo';

export default function setupMocks(app: Object) {
  app.get('/api/v1/tasks/list/:status*?', (req, res) => {
    const { status } = req.params;

    res.json({
      tasks: tasks.filter(t => !status || t.state === status),
    });
  });
}
