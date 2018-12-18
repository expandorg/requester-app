// @flow

export const links = [
  {
    href: '/',
    text: 'All',
  },
  {
    href: '/tasks/draft',
    text: 'Draft',
  },
  {
    href: '/tasks/pending',
    text: 'Pending',
  },
  {
    href: '/tasks/scheduled',
    text: 'Scheduled',
  },
  {
    href: '/tasks/in-progress',
    text: 'In Progress',
  },
  {
    href: '/tasks/completed',
    text: 'Completed',
  },
];

export const isActive = (match: Object, localtion: Object): boolean => {
  if (match && match.isExact) {
    return true;
  }
  return /^\/tasks/i.test(localtion.pathname);
};
