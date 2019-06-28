import React from 'react';
import PropTypes from 'prop-types';

import { Sidebar as UISidebar } from '@expandorg/components/app';

import { NavLink } from 'react-router-dom';

import { ReactComponent as Gear } from '../../assets/settings2.svg';
import { ReactComponent as Api } from '../../assets/api.svg';
import { ReactComponent as Stats } from '../../assets/stats.svg';
import { ReactComponent as Jobs } from '../../assets/jobs.svg';

function Link({ link, title, icon, isActive }) {
  return (
    <NavLink
      to={link}
      className="gem-sidebar-link"
      isActive={isActive}
      exact
      activeClassName="gem-sidebar-link-active"
    >
      {icon}
      {title}
    </NavLink>
  );
}

Link.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default function Sidebar() {
  return (
    <UISidebar>
      {Sidebar.navigation.map(({ link, title, icon, isActive }) => (
        <Link
          key={link}
          link={link}
          title={title}
          icon={icon()}
          isActive={isActive}
        />
      ))}
    </UISidebar>
  );
}
const icn = 'gem-sidebar-link-icon';

Sidebar.navigation = [
  {
    link: '/',
    title: 'Jobs',
    icon: () => (
      <Jobs className={icn} width="24px" height="24px" viewBox="0 0 21 21" />
    ),
    isActive: (match, localtion) => {
      if (match && match.isExact) {
        return true;
      }
      return /^\/tasks/i.test(localtion.pathname);
    },
  },
  {
    link: '/stats',
    title: 'Stats',
    icon: () => (
      <Stats className={icn} width="24" height="24" viewBox="5 5 20 20" />
    ),
  },
  {
    link: '/api',
    title: 'API',
    icon: () => (
      <Api className={icn} width="24" height="24" viewBox="4 4 20 20" />
    ),
  },
  {
    link: '/settings',
    title: 'Settings',
    icon: () => (
      <Gear className={icn} width="24" height="24" viewBox="2 2 22 22" />
    ),
  },
];
