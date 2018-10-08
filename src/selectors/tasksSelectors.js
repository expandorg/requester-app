// @flow

export const tasksEntitiesSelector = (state: Object) => state.tasks.entities;

export const tasksListSelector = (state: Object) => state.tasks.list;

export const tasksSelector = () => [
  {
    id: 0,
    title: 'Task Title',
    state: 'draft',
    logo: '/images/yc.png',
  },
  {
    id: 1,
    title: 'Task Title',
    state: 'in progress',
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
