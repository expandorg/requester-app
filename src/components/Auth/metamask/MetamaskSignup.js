import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ErrorMessage } from '@expandorg/components';

import { SubmitStateEffect } from '@expandorg/app-utils';
import { signupMetamaskStateSelector } from '@expandorg/app-auth/selectors';
import { signupMetamask } from '@expandorg/app-auth/sagas';

import { metamaskStateSelector } from '@expandorg/app-web3/selectors';
import { MetamaskPromt } from '@expandorg/app-web3/components';
import { MetamaskState } from '@expandorg/app-web3';

import styles from './styles.module.styl';

export default function MetamaskSignup() {
  const dispatch = useDispatch();
  const mmask = useSelector(metamaskStateSelector);
  const signupState = useSelector(signupMetamaskStateSelector);

  const [dialog, setDialog] = useState(false);
  const hide = useCallback(() => setDialog(false), []);

  const [error, setError] = useState(null);
  const failed = useCallback(({ err }) => setError(err), []);

  const click = useCallback(() => {
    if (mmask.state !== MetamaskState.Authorized) {
      setDialog(true);
    } else {
      dispatch(signupMetamask());
    }
  }, [dispatch, mmask.state]);

  const signup = useCallback(() => dispatch(signupMetamask()), [dispatch]);

  return (
    <div className={styles.container}>
      <button className="gem-metamask-button" onClick={click}>
        <ins className={styles.fox} /> Sign up with MetaMask
      </button>
      {dialog && (
        <MetamaskPromt
          onLogin={signup}
          onHide={hide}
          action="Sign up"
          error={error}
        />
      )}
      <ErrorMessage errors={error} className={styles.error} />
      <SubmitStateEffect submitState={signupState} onFailed={failed} />
    </div>
  );
}
