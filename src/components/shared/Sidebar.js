import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Sidebar as UISidebar, SidebarLink } from '@expandorg/components/app';

import { ReactComponent as ApiIcon } from '@expandorg/uikit/assets/api.svg';
import { ReactComponent as DashboardIcon } from '@expandorg/uikit/assets/dashboard.svg';
import { ReactComponent as StatsIcon } from '@expandorg/uikit/assets/stats.svg';
import { ReactComponent as SettingsIcon } from '@expandorg/uikit/assets/settings.svg';

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
      {
        link: '/',
        title: 'Dashboard',
        icon: DashboardIcon,
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
