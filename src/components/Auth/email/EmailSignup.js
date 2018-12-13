import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';

import { ErrorMessage, Button } from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import { signupStateSelector } from '@gemsorg/app-auth/selectors';
import { signup } from '@gemsorg/app-auth/sagas';

import Input from '../../common/Input';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  signupState: signupStateSelector(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch);

class EmailSignup extends Component {
  static propTypes = {
    signupState: requestStateProps.isRequired,
    onToggle: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    password: '',
    error: null,
  };

  componentWillReceiveProps({ signupState: nextState }) {
    const { signupState } = this.props;
    if (nextState.error && nextState.error !== signupState.error) {
      this.setState({ error: nextState.error });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.props.signupState.state !== RequestStates.Fetching) {
      const { email, password } = this.state;
      this.setState({ error: null });
      this.props.signup({ email, password });
    }
  };

  handleChangeField = (field, { target }) => {
    this.setState({ [field]: target.value, error: null });
  };

  render() {
    const { signupState, onToggle } = this.props;
    const { email, password, error } = this.state;

    const isFetching = signupState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Logo
            width={40}
            height={40}
            viewBox="0 0 50 50"
            className={styles.logo}
          />
          <h2 className={styles.title}>Sign up manually</h2>
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
          <ErrorMessage error={error} className={styles.error} />
          <Button
            type="submit"
            className={cn(styles.submit, styles.signUpSubmit)}
          >
            {isFetching ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>
        <Button type="submit" className={styles.toggle} onClick={onToggle}>
          Login
        </Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignup);
