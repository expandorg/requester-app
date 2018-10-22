// @flow
import { range } from '@gemsorg/utils/src/immutable';

const mocks = range(20).map(id => ({
  id,
  name:
    id === 0 ? `Template name very very long, ${id}` : `Template name, ${id}`,
  logo: 'https://portal.gems.org//images/complete-tasks.png',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}));

export default mocks;
