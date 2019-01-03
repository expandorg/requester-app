import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '@gemsorg/app-auth/sagas';

import styles from './Navbar.module.styl';

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  handleClick = () => {
    this.props.logout();
  };

  render() {
    return (
      <button className={styles.logout} onClick={this.handleClick}>
        Logout
      </button>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Logout);
