import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Sidebar as UISidebar, SidebarLink } from '@expandorg/components/app';

import { ReactComponent as ApiIcon } from '../assets/api.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as StatsIcon } from '../assets/stats.svg';
// import { ReactComponent as ProfileIcon } from '../assets/profile.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';

import { isActive } from '../../model/dashboard';

export default class Sidebar extends Component {
  static propTypes = {
    navigation: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.func.isRequired,
      })
    ),
  };

  static defaultProps = {
    navigation: [
      // {
      //   link: '/profile',
      //   title: 'Profile',
      //   icon: ProfileIcon,
      // },
      {
        link: '/',
        title: 'Dashboard',
        icon: DashboardIcon,
        isActive,
      },
      {
        link: '/stats',
        title: 'Stats',
        icon: StatsIcon,
      },
      {
        link: '/api',
        title: 'API',
        icon: ApiIcon,
      },
      {
        link: '/settings',
        title: 'Settings',
        icon: SettingsIcon,
      },
    ],
  };

  render() {
    const { navigation } = this.props;

    return (
      <UISidebar>
        {navigation.map(item => (
          <SidebarLink key={item.link} item={item} />
        ))}
      </UISidebar>
    );
  }
}
