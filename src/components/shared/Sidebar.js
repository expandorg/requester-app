import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter, NavLink } from 'react-router-dom';

import { ReactComponent as ApiIcon } from '../assets/api.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
import { ReactComponent as ProfileIcon } from '../assets/profile.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';

import './Sidebar.styl';

const navItemType = PropTypes.shape({
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
});

const SidebarLink = ({ item }) => (
  <NavLink
    to={item.link}
    exact
    className="gem-sidebar-nav-link"
    activeClassName="gem-sidebar-nav-link-active"
  >
    <item.icon className="gem-sidebar-nav-link-icon" />
    {item.title}
  </NavLink>
);

SidebarLink.propTypes = {
  item: navItemType.isRequired,
};

class Sidebar extends Component {
  static propTypes = {
    navigation: PropTypes.arrayOf(navItemType),
  };

  static defaultProps = {
    navigation: [
      {
        link: '/',
        title: 'Dashboard',
        icon: DashboardIcon,
      },
      {
        link: '/profile',
        title: 'Profile',
        icon: ProfileIcon,
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
      <div className="gem-sidebar">
        <div className="gem-sidebar-nav">
          {navigation.map(item => (
            <SidebarLink key={item.link} item={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);
