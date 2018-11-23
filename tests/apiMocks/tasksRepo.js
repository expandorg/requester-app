const range = count => [...Array(count).keys()];

export const tasks = range(10).map(id => ({
  id,
  title: 'Task Title',
  state: Math.random() > 0.5 ? 'completed' : 'inprogress',
  description: 'Task description',
  logoUrl: '/images/yc.png',
}));

export const drafts = range(5).map(id => ({
  id,
  title: `Draft Title ${id}`,
  logoUrl: '/images/yc.png',
  startDate: new Date(),
  endDate: null,
}));

export const getDashboardTask = task => ({
  taskId: task.id,
  title: task.title,
  logo: task.logoUrl,
  state: task.state,
});

export const getDashboardDraft = draft => ({
  draftId: draft.id,
  title: draft.title,
  logo: draft.logoUrl,
  state: 'draft',
});

export const createTask = draft => ({
  id: tasks.length,
  title: draft.title,
  state: 'inprogress',
  logoUrl: draft.logoUrl,
  startDate: draft.logoUrl,
  endDate: draft.logoUrl,
});

export const taskTemplates = range(20).map(id => ({
  id,
  name:
    id === 0 ? `Template name very very long, ${id}` : `Template name, ${id}`,
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  task: {
    name: 'Task',
    form: {
      modules: [],
    },
  },
  onboarding: {
    enabled: true,
    steps: [],
  },
}));

export const formTemplates = range(20).map(id => ({
  id,
  name: id === 0 ? `Form template name very very long, ${id}` : `form, ${id}`,
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  form: {
    modules: [],
  },
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}));
