import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout as logoutSaga } from '@expandorg/app-auth/sagas';

import { Navbar as UINavbar } from '@expandorg/components';

import './Navbar.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onLogout: logoutSaga }, dispatch);

class Navbar extends Component {
  static propTypes = {
    logout: PropTypes.bool,
    onLogout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    logout: true,
  };

  render() {
    const { children, logout, onLogout, ...rest } = this.props;

    return (
      <UINavbar
        {...rest}
        menu={
          logout && (
            <button className="gem-logout" onClick={onLogout}>
              Logout
            </button>
          )
        }
      >
        {children}
      </UINavbar>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
