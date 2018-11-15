const range = count => [...Array(count).keys()];

export const tasks = [
  {
    id: 0,
    title: 'Task Title',
    state: 'draft',
    logo: '/images/yc.png',
  },
  {
    id: 1,
    title: 'Task Title',
    state: 'inprogress',
    logo: '/images/yc.png',
  },
  {
    id: 2,
    title: 'Task Title',
    state: 'draft',
    logo: '/images/yc.png',
  },
  {
    id: 3,
    title: 'Task Title',
    state: 'draft',
    logo: '/images/yc.png',
  },
  {
    id: 4,
    title: 'Task Title',
    state: 'inprogress',
    logo: '/images/yc.png',
  },
  {
    id: 5,
    title: 'Task Title',
    state: 'completed',
    logo: '/images/yc.png',
  },
  {
    id: 6,
    title: 'Task Title',
    state: 'draft',
    logo: '/images/yc.png',
  },
  {
    id: 7,
    title: 'Task Title',
    state: 'completed',
    logo: '/images/yc.png',
  },
];
export const createTask = draft => ({
  id: tasks.length,
  title: draft.title,
  state: 'inprogress',
  logo: draft.logoUrl,
});

export const taskTemplates = range(20).map(id => ({
  id,
  name:
    id === 0 ? `Template name very very long, ${id}` : `Template name, ${id}`,
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}));

export const formTemplates = range(20).map(id => ({
  id,
  name: id === 0 ? `Form template name very very long, ${id}` : `form, ${id}`,
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}));
