import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { validateForm } from '@expandorg/validation';
import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';

import { Deposit } from '@expandorg/app-gemtokens/components';

import { Input, Button } from '@expandorg/components';

import { ReactComponent as Card } from '@expandorg/uikit/assets/creditcard.svg';

import { draftProps } from '../../../shared/propTypes';

import { Form, Description, Field, Fieldset, Actions } from '../Form';

import Hero from '../../../shared/Hero';
import HeroWarning from '../../../shared/HeroWarning';

import { updateFunding } from '../../../../sagas/draftsSagas';
import { updateDraftFundingStateSelector } from '../../../../selectors/uiStateSelectors';

import { fundingRules } from '../../../../model/draft';
import { DraftStatus } from '../../../../model/enums';

import styles from './Payments.module.styl';

const mapsStateToProps = state => ({
  user: userSelector(state),
  submitState: updateDraftFundingStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateFunding }, dispatch);

const getInitialState = ({ funding }) => ({
  balance: (funding && `${funding.balance || 0}`) || '',
  reward: (funding && `${funding.reward || 0}`) || '',
});

class Payments extends Component {
  static propTypes = {
    user: userProps.isRequired,
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,

    updateFunding: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      errors: null,
      ...getInitialState(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        errors: null,
        ...getInitialState(draft),
      };
    }
    return null;
  }

  handleSubmit = () => {
    const { draft, submitState, user } = this.props;
    if (submitState.state === RequestStates.Fetching) {
      return;
    }
    const { balance, reward } = this.state;
    const funding = {
      ...draft.funding,
      balance: +balance,
      reward: +reward,
    };
    const errors = validateForm({ balance, reward }, fundingRules);
    if (errors) {
      this.setState({ errors, insufficent: false });
    } else if (user.gems.balance < balance) {
      this.setState({ insufficent: true });
    } else {
      this.props.updateFunding(draft.id, funding);
    }
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();
    evt.preventDefault();
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleUpdateComplete = () => {
    const { onNext } = this.props;
    onNext();
  };

  render() {
    const { submitState, user, draft } = this.props;
    const { balance, reward, errors, insufficent } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Hero value={user.gems.balance} title="XPN available" />
          <Field tooltip="Pay for Task *" name="balance" errors={errors}>
            <Input
              placeholder="Pay for Task *"
              disabled={draft.status !== DraftStatus.draft}
              name="balance"
              value={balance}
              error={!!(errors && errors.balance)}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field
            tooltip="Amount Earned per Task *"
            name="reward"
            errors={errors}
          >
            <Input
              placeholder="Amount Earned per Task *"
              name="reward"
              value={reward}
              error={!!(errors && errors.reward)}
              onChange={this.handleInputChange}
            />
          </Field>
          {insufficent && (
            <HeroWarning
              className={styles.warning}
              icon={<Card width="82px" height="64px" viewBox="0 0 72 56" />}
            >
              You do not have enough XPN.
              <br />
              Would you like to deposit some XPN?
            </HeroWarning>
          )}
          <Field>
            <Deposit user={user}>
              {({ onToggleDepsoit }) => (
                <button
                  type="button"
                  className={styles.deposit}
                  onClick={onToggleDepsoit}
                >
                  deposit XPN
                </button>
              )}
            </Deposit>
          </Field>
        </Fieldset>
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
          <SubmitStateEffect
            submitState={submitState}
            onComplete={this.handleUpdateComplete}
          />
        </Actions>
      </Form>
    );
  }
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Payments);
