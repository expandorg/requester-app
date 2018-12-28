import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withRouter, NavLink } from 'react-router-dom';

import { ReactComponent as ApiIcon } from '../assets/api.svg';
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg';
// import { ReactComponent as ProfileIcon } from '../assets/profile.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';

import { isActive } from '../../model/dashboard';

import './Sidebar.styl';

const navItemType = PropTypes.shape({
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
});

const SidebarLink = ({ item }) => (
  <NavLink
    to={item.link}
    className="gem-sidebar-link"
    isActive={item.isActive}
    exact
    activeClassName="gem-sidebar-link-active"
  >
    <item.icon className="gem-sidebar-link-icon" />
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
      // {
      //   link: '/profile',
      //   title: 'Profile',
      //   icon: ProfileIcon,
      // },
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
        <NavLink
          to="/"
          className="gem-sidebar-link"
          isActive={isActive}
          exact
          activeClassName="gem-sidebar-link-active"
        >
          <DashboardIcon className="gem-sidebar-link-icon" />
          Dashboard
        </NavLink>
        {navigation.map(item => (
          <SidebarLink key={item.link} item={item} />
        ))}
      </div>
    );
  }
}

export default withRouter(Sidebar);
