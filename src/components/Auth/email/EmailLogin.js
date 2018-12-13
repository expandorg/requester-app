import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Link } from 'react-router-dom';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import { Button, ErrorMessage } from '@gemsorg/components';

import { loginStateSelector } from '@gemsorg/app-auth/selectors';
import { login } from '@gemsorg/app-auth/sagas';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import Input from '../../common/Input';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  loginState: loginStateSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch);

class EmailLogin extends Component {
  static propTypes = {
    loginState: requestStateProps.isRequired,
    onToggle: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  componentWillReceiveProps({ loginState: nextState }) {
    const { loginState } = this.props;
    if (nextState.error && nextState.error !== loginState.error) {
      this.setState({ error: nextState.error });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.loginState.state !== RequestStates.Fetching) {
      const { email, password } = this.state;
      this.setState({ error: null });
      this.props.login(email, password);
    }
  };

  handleChangeField = (field, { target }) => {
    this.setState({ [field]: target.value, error: null });
  };

  render() {
    const { loginState, onToggle } = this.props;
    const { email, password, error } = this.state;
    const isFetching = loginState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Logo
            width={40}
            height={40}
            viewBox="0 0 50 50"
            className={styles.logo}
          />
          <h2 className={styles.title}>Sign in manually</h2>
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <Input
            className={styles.input}
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={evt => this.handleChangeField('email', evt)}
          />
          <Input
            className={styles.input}
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={evt => this.handleChangeField('password', evt)}
          />
          <Link className={styles.forgot} to="/password">
            Forgot password?
          </Link>
          <ErrorMessage error={error} className={styles.error} />
          <Button type="submit" className={styles.submit}>
            {isFetching ? 'Signing in...' : 'Login'}
          </Button>
        </form>
        <Button type="submit" className={styles.toggle} onClick={onToggle}>
          Sign up
        </Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailLogin);
