import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { userProps } from '@expandorg/app-auth';
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
    const [params, errors] = DraftFunding.getFundingRequestParams(
      draft,
      user,
      balance,
      reward
    );
    if (errors) {
      this.setState({ errors });
    } else {
      this.props.updateFunding(draft.id, params);
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
    const { balance, reward, errors } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>
            It’s the final frontier, calculate how you want to pay your workers
            fairly.
          </Description>
          <Hero
            value={user.gems.balance}
            title="XPN AVAILABLE IN ACCOUNT"
            className={cn({ [styles.zero]: !user.gems.balance })}
          />
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
          <Field
            tooltip="Your entire budget for the task. *"
            name="balance"
            errors={errors}
          >
            <Input
              placeholder="Task Budget *"
              disabled={DraftFunding.balanceIsReadonly(draft)}
              name="balance"
              value={balance}
              error={!!(errors && errors.balance)}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field
            tooltip="The amount the workers will earn. *"
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
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Actions>
        <SubmitStateEffect
          submitState={submitState}
          onComplete={this.handleUpdateComplete}
        />
      </Form>
    );
  }
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Payments);
