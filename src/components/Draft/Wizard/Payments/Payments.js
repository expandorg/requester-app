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

import { ReactComponent as Card } from '../../../assets/creditcard.svg';

import Input from '../../../common/Input';
import Button from '../../../common/Button';

import { draftProps } from '../../../shared/propTypes';
import Deposit from '../../../shared/Deposit/Deposit';

import { Form, Description, Field, Fieldset, Actions } from '../Form';

import Hero from '../../../shared/Hero';
import HeroWarning from '../../../shared/HeroWarning';

import { updateFunding } from '../../../../sagas/draftsSagas';
import { updateDraftFundingStateSelector } from '../../../../selectors/uiStateSelectors';

import { fundingRules } from '../../../../model/draft';

import styles from './Payments.module.styl';

const mapsStateToProps = state => ({
  user: userSelector(state),
  submitState: updateDraftFundingStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateFunding }, dispatch);

const getInitialState = ({ logic }) => ({
  requirement: (logic.funding && `${logic.funding.requirement || 0}`) || '',
  reward: (logic.funding && `${logic.funding.reward || 0}`) || '',
  module: logic.funding && `${logic.funding.module || ''}`,
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
      funding: getInitialState(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        errors: null,
        funding: getInitialState(draft),
      };
    }
    return null;
  }

  handleSubmit = () => {
    const { draft, submitState } = this.props;
    if (submitState.state !== RequestStates.Fetching) {
      const { requirement, reward, module } = this.state.funding;
      const funding = {
        module,
        requirement: +requirement,
        reward: +reward,
      };
      const errors = validateForm(this.state.funding, fundingRules);
      if (errors) {
        this.setState({ errors });
      } else {
        this.props.updateFunding(draft.id, { ...draft.logic, funding });
      }
    }
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleInputChange = ({ target }) => {
    this.setState(({ funding }) => ({
      funding: { ...funding, [target.name]: target.value },
    }));
  };

  handleUpdateComplete = () => {
    const { onNext } = this.props;
    onNext();
  };

  render() {
    const { submitState, user } = this.props;
    const { funding, errors } = this.state;
    const insufficent = false;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Hero value={user.gems.balance} title="XPN available" />
          {!insufficent && (
            <>
              <Field
                tooltip="Pay for Task *"
                name="requirement"
                errors={errors}
              >
                <Input
                  placeholder="Pay for Task *"
                  name="requirement"
                  value={funding.requirement}
                  error={!!(errors && errors.requirement)}
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
                  value={funding.reward}
                  error={!!(errors && errors.reward)}
                  onChange={this.handleInputChange}
                />
              </Field>
            </>
          )}
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
