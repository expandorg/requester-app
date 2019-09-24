import React, { useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { IconInput, Button, Panel } from '@expandorg/components';
import { EmailConfirmed } from '@expandorg/app-account/components';

import { RequestStates } from '@expandorg/app-utils';
import { userSelector } from '@expandorg/app-auth/selectors';

import { generateKey } from '../../sagas/accessTokenSagas';
import { generateAccessTokenStateSelector } from '../../selectors/uiStateSelectors';
import { accessTokenSelector } from '../../selectors/accessTokenSelectors';

import styles from './ApiKeyForm.module.styl';

export default function ApiKeyForm() {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const accessToken = useSelector(accessTokenSelector);
  const submitState = useSelector(generateAccessTokenStateSelector);

  const generate = useCallback(
    evt => {
      if (submitState !== RequestStates.Fetching) {
        dispatch(generateKey(user));
      }
      evt.preventDefault();
    },
    [dispatch, submitState, user]
  );

  const submitting = submitState.state === RequestStates.Fetching;
  const submitted = submitState.state === RequestStates.Fetched;

  return (
    <Panel className={styles.panel}>
      <div className={styles.token}>
        {submitted && (
          <IconInput
            value={accessToken}
            className={styles.input}
            placeholder="API Key"
            readOnly
            copy
          />
        )}
        {!submitted && (
          <EmailConfirmed user={user} onConfirmed={generate}>
            {({ onToggle }) => (
              <Button
                className={styles.generate}
                size="small"
                theme="white-blue"
                disabled={submitting}
                onClick={onToggle}
              >
                generate an api key
              </Button>
            )}
          </EmailConfirmed>
        )}
      </div>
      {submitted && (
        <div className={styles.alert}>
          Save your key or it will be lost if you leave this page.
        </div>
      )}
    </Panel>
  );
}
