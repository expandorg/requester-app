// @flow

export const links = [
  {
    href: '/',
    text: 'All',
  },
  {
    href: '/tasks/draft',
    text: 'Drafts',
  },
  {
    href: '/tasks/inprogress',
    text: 'In Progress',
  },
  {
    href: '/tasks/completed',
    text: 'Completed',
  },
  {
    href: '/tasks/scheduled',
    text: 'Scheduled',
  },
  {
    href: '/tasks/pending',
    text: 'Pending',
  },
];

export const isActive = (match: Object, localtion: Object): boolean => {
  if (match && match.isExact) {
    return true;
  }
  return /^\/tasks/i.test(localtion.pathname);
};
