// @flow

export const links = [
  {
    href: '/',
    text: 'All',
  },
  {
    href: '/tasks/drafts',
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
];

export const isActive = (match: Object, localtion: Object): boolean => {
  console.log(match, localtion);
  if (match && match.isExact) {
    return true;
  }
  return /^\/tasks/i.test(localtion.pathname);
};
