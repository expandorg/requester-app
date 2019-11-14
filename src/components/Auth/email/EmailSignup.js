import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';

import { Button, ErrorMessage, Input } from '@expandorg/components';

import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import { signupStateSelector } from '@expandorg/app-auth/selectors';
import { signup } from '@expandorg/app-auth/sagas';

import { ReactComponent as Logo } from '@expandorg/uikit/assets/logo.svg';

import styles from './styles.module.styl';

export default function EmailSignup() {
  const dispatch = useDispatch();
  const signupState = useSelector(signupStateSelector);

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

  const failed = useCallback(p => setError(p.error), []);

  const isFetching = signupState.state === RequestStates.Fetching;

  const submit = useCallback(
    evt => {
      evt.preventDefault();

      if (!isFetching) {
        setError(null);
        dispatch(signup({ email, password }));
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
        <h2 className={styles.title}>Sign up manually</h2>
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
        <ErrorMessage errors={error} className={styles.error} />
        <Button
          type="submit"
          className={cn(styles.submit, styles.signUpSubmit)}
        >
          {isFetching ? 'Signing up' : 'Sign up'}
        </Button>
      </form>
      <SubmitStateEffect submitState={signupState} onFailed={failed} />
    </div>
  );
}
