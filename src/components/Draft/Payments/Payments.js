import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useDispatch, useSelector } from 'react-redux';

import { RequestStates, SubmitStateEffect } from '@expandorg/app-utils';

import { userSelector } from '@expandorg/app-auth/selectors';
import { Deposit } from '@expandorg/app-gemtokens/components';
import { Input, Button } from '@expandorg/components';
import { ReactComponent as Card } from '@expandorg/uikit/assets/creditcard.svg';

import { Form, Description, Field, Fieldset, Actions } from '../controls';

import { draftProps } from '../../shared/propTypes';
import Hero from '../../shared/Hero';
import HeroWarning from '../../shared/HeroWarning';

import { updateFunding } from '../../../sagas/draftsSagas';
import { updateDraftFundingStateSelector } from '../../../selectors/uiStateSelectors';

import DraftFunding from '../../../model/DraftFunding';

import styles from './Payments.module.styl';
import Calculator from './Calculator/Calculator';
import XPNValue from './XPNValue';

const getInitialState = ({ funding }) => ({
  balance: (funding && `${funding.balance || 0}`) || '',
  reward: (funding && `${funding.reward || 0}`) || '',
});

export default function Payments({ draft, onNext, onBack }) {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const submitState = useSelector(updateDraftFundingStateSelector);

  const [errors, setErrors] = useState(null);
  const [form, setForm] = useState(getInitialState(draft));

  useEffect(() => {
    setForm(getInitialState(draft));
    setErrors(null);
  }, [draft]);

  const inputChange = useCallback(
    ({ target }) => {
      setForm({
        ...form,
        [target.name]: target.value,
      });
    },
    [form]
  );

  const submit = useCallback(() => {
    if (submitState.state !== RequestStates.Fetching) {
      const [params, validation] = DraftFunding.getFundingRequestParams(
        draft,
        user,
        form.balance,
        form.reward
      );
      if (validation) {
        setErrors(validation);
      } else {
        dispatch(updateFunding(draft.id, params));
      }
    }
  }, [dispatch, draft, form.balance, form.reward, submitState.state, user]);

  return (
    <Form>
      <div>
        <Description>
          It’s the final frontier, calculate how much you want to pay your
          workers.
        </Description>
        <Fieldset>
          <Hero
            value={user.gems.balance}
            title=" tokens available TO FUND YOUR job"
            className={cn(styles.hero, { [styles.zero]: !user.gems.balance })}
          />
          <Field>
            <Deposit user={user}>
              {({ onToggleDepsoit }) => (
                <button
                  type="button"
                  className={styles.deposit}
                  onClick={onToggleDepsoit}
                >
                  deposit XPN tokens
                </button>
              )}
            </Deposit>
          </Field>
          <Calculator draft={draft} />
          <XPNValue />
          <Field
            tooltip="This is the total amount of funds you will set aside for the job. *"
            name="balance"
            errors={errors}
          >
            <Input
              placeholder="Total Budget *"
              disabled={DraftFunding.balanceIsReadonly(draft)}
              name="balance"
              value={form.balance}
              error={!!(errors && errors.balance)}
              onChange={inputChange}
            />
          </Field>
          <Field
            tooltip="The amount the workers will earn for each task completion. *"
            name="reward"
            errors={errors}
          >
            <Input
              placeholder="Amount Earned per Task *"
              name="reward"
              value={form.reward}
              error={!!(errors && errors.reward)}
              onChange={inputChange}
            />
          </Field>
          {errors && errors.insufficent && (
            <HeroWarning
              className={styles.warning}
              icon={<Card width="82px" height="64px" viewBox="0 0 72 56" />}
            >
              You do not have enough XPN.
              <br />
              Would you like to deposit some XPN?
            </HeroWarning>
          )}
        </Fieldset>
      </div>
      <Actions>
        <Button theme="secondary" onClick={onBack}>
          Back
        </Button>
        <Button onClick={submit}>Next</Button>
      </Actions>
      <SubmitStateEffect submitState={submitState} onComplete={onNext} />
    </Form>
  );
}

Payments.propTypes = {
  draft: draftProps.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
};
