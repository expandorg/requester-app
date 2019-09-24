import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';
import { IconInput, Button } from '@expandorg/components';

import { draftProps } from '../../shared/propTypes';

import {
  Form,
  Description,
  Field,
  Fieldset,
  Toggle,
  Actions,
} from '../controls';

import {
  NameTooltip,
  StakingTooltip,
  descTooltip,
  CallbackTooltip,
} from './tooltips';

import { validate, getInitialState, getSettings } from './form';
import { updateSettings } from '../../../sagas/draftsSagas';
import { updateDraftSettingsStateSelector } from '../../../selectors/uiStateSelectors';

import styles from './Settings.module.styl';

export default function Settings({ onBack, onNext, draft }) {
  const dispatch = useDispatch();
  const rs = useSelector(updateDraftSettingsStateSelector);

  const isSubmitting = rs.state === RequestStates.Fetching;

  const [errors, setErrors] = useState(null);
  const [settings, setSettings] = useState(getInitialState(draft));
  useEffect(() => {
    setSettings(getInitialState(draft));
    setErrors(null);
  }, [draft]);

  const submit = useCallback(() => {
    if (!isSubmitting) {
      const e = validate(settings);
      if (e) {
        setErrors(e);
      } else {
        dispatch(updateSettings(draft.id, getSettings(settings)));
      }
    }
  }, [dispatch, draft.id, isSubmitting, settings]);

  const change = useCallback(
    ({ target: t }) => setSettings({ ...settings, [t.name]: t.value }),
    [settings]
  );

  const changeStaking = useCallback(
    val => {
      setSettings({
        ...settings,
        staking: val,
        stake: val ? settings.stake : '',
      });
    },
    [settings]
  );

  const complete = useCallback(() => onNext(), [onNext]);

  return (
    <Form>
      <div>
        <Description className={styles.desc}>
          Nearly there now! Add in some details to help your workers understand
          what your job is all about.
        </Description>
        <Fieldset className={styles.fieldset}>
          <Field name="name" errors={errors}>
            <IconInput
              placeholder="Title *"
              tooltip={<NameTooltip />}
              tooltipOrientation="right"
              tooltipPosition="center"
              name="name"
              error={!!(errors && errors.name)}
              value={settings.name}
              onChange={change}
            />
          </Field>
          <Field name="description" errors={errors}>
            <IconInput
              placeholder="Description *"
              name="description"
              tooltip={descTooltip}
              tooltipOrientation="right"
              tooltipPosition="center"
              error={!!(errors && errors.description)}
              value={settings.description}
              onChange={change}
            />
          </Field>
          <Field>
            <Toggle
              tooltip={<StakingTooltip />}
              tooltipOrientation="right"
              tooltipPosition="center"
              value={settings.staking}
              label="Staking"
              name="staking"
              onChange={changeStaking}
            />
          </Field>
          {settings.staking && (
            <Field name="stake" errors={errors}>
              <IconInput
                placeholder="How much to stake?"
                tooltip="How much to stake?"
                tooltipOrientation="right"
                tooltipPosition="center"
                error={!!(errors && errors.stake)}
                name="stake"
                value={settings.stake}
                onChange={change}
              />
            </Field>
          )}
          <Field>
            <IconInput
              placeholder="Callback Url"
              tooltip={<CallbackTooltip />}
              tooltipOrientation="right"
              tooltipPosition="center"
              name="callbackUrl"
              value={settings.callbackUrl}
              onChange={change}
            />
          </Field>
        </Fieldset>
      </div>
      <Actions>
        <Button theme="white-blue" onClick={onBack}>
          Back
        </Button>
        <Button disabled={isSubmitting} onClick={submit}>
          Next
        </Button>
      </Actions>
      <SubmitStateEffect submitState={rs} onComplete={complete} />
    </Form>
  );
}

Settings.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};
