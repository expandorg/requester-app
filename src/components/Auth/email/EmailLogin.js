import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import { Button, ErrorMessage, Input } from '@expandorg/components';

import { loginStateSelector } from '@expandorg/app-auth/selectors';
import { login } from '@expandorg/app-auth/sagas';

import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import settings from '../../../common/settings';

import styles from './styles.module.styl';

export default function EmailLogin() {
  const dispatch = useDispatch();

  const loginState = useSelector(loginStateSelector);

  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = useCallback(({ target }) => {
    setEmail(target.value);
    setError(null);
  }, []);

  const changePassword = useCallback(({ target }) => {
    setPassword(target.value);
    setError(null);
  }, []);

  const failed = useCallback((p) => setError(p.error), []);

  const isFetching = loginState.state === RequestStates.Fetching;

  const submit = useCallback(
    (evt) => {
      evt.preventDefault();

      if (!isFetching) {
        setError(null);
        dispatch(login(email, password));
      }
    },
    [dispatch, email, isFetching, password]
  );

  return (
    <div className="gem-email-container">
      <div className={styles.header}>
        <Logo
          width={40}
          height={40}
          viewBox="0 0 50 50"
          className={styles.logo}
        />
        <h2 className={styles.title}>Sign in manually</h2>
      </div>
      <form className={styles.form} onSubmit={submit}>
        <Input
          className={styles.input}
          type="email"
          required
          placeholder="Email address"
          value={email}
          name="email"
          onChange={changeEmail}
        />
        <Input
          className={styles.input}
          type="password"
          required
          placeholder="Password"
          value={password}
          name="password"
          onChange={changePassword}
        />
        <div className={styles.forgotContainer}>
          <a
            className={styles.forgot}
            href={`${settings.frontendUrl}/password`}
          >
            Forgot password?
          </a>
        </div>
        <ErrorMessage errors={error} className={styles.error} />
        <Button type="submit" className={styles.submit}>
          {isFetching ? 'Logging in' : 'Log in'}
        </Button>
      </form>
      <SubmitStateEffect submitState={loginState} onFailed={failed} />
    </div>
  );
}
