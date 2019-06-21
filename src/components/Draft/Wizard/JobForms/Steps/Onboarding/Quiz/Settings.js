import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Input } from '@expandorg/components';
import { validateForm } from '@expandorg/validation';

import { Fieldset, Field } from '../../../../Form';
import Nav from './Nav';

import { WizardSteps } from './wizard';
import { draftOnboardingStepProps } from '../../../../../../shared/propTypes';
import { onboardingGroupSettingsRules } from '../../../../../../../model/draft';

import styles from './styles.module.styl';

export default class Settings extends Component {
  static propTypes = {
    group: draftOnboardingStepProps.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onChangeStep: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.group, // eslint-disable-line react/no-unused-state
      scoreThreshold: `${props.group.scoreThreshold || 0}`,
      retries: `${props.group.retries || 0}`,
      failureMessage: props.group.failureMessage,
      errors: null,
    };
  }

  static getDerivedStateFromProps({ group }, state) {
    if (state.original !== group) {
      return {
        original: group,
        scoreThreshold: `${group.scoreThreshold || 0}`,
        retries: `${group.retries || 0}`,
        failureMessage: group.failureMessage,
        errors: null,
        isDirty: false,
      };
    }
    return null;
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
      isDirty: true,
    });
  };

  handleSave = () => {
    const { onChangeStep, onUpdate, group } = this.props;
    const { isDirty, scoreThreshold, retries, failureMessage } = this.state;
    if (isDirty) {
      const settings = {
        scoreThreshold: +scoreThreshold,
        retries: +retries,
        failureMessage,
      };
      const errors = validateForm(
        { scoreThreshold, retries, failureMessage },
        onboardingGroupSettingsRules
      );
      if (errors) {
        this.setState({ errors });
        return;
      }
      onUpdate({ ...group, ...settings });
    }
    onChangeStep(WizardSteps.Quiz);
  };

  render() {
    const { onChangeStep } = this.props;
    const { errors, scoreThreshold, retries, failureMessage } = this.state;

    return (
      <div className={styles.container}>
        <Nav onChangeStep={onChangeStep} active={WizardSteps.Settings} />
        <div className={styles.content}>
          <Fieldset>
            <div className={styles.description}>Quiz settings</div>
            <Field
              tooltip="Number of attempts to pass quiz"
              name="retries"
              errors={errors}
            >
              <Input
                placeholder="Number of tries"
                name="retries"
                type="number"
                required
                value={retries}
                error={!!(errors && errors.retries)}
                onChange={this.handleInputChange}
              />
            </Field>
            <Field
              tooltip="Score threshold"
              name="scoreThreshold"
              errors={errors}
            >
              <Input
                placeholder="Score threshold"
                name="scoreThreshold"
                type="number"
                required
                value={scoreThreshold}
                error={!!(errors && errors.scoreThreshold)}
                onChange={this.handleInputChange}
              />
            </Field>
            <Field
              tooltip="Failure Message"
              name="failureMessage"
              errors={errors}
            >
              <Input
                placeholder="Failure Message"
                name="failureMessage"
                required
                value={failureMessage}
                error={!!(errors && errors.failureMessage)}
                onChange={this.handleInputChange}
              />
            </Field>
          </Fieldset>
        </div>
        <div className={styles.actions}>
          <Button theme="grey" onClick={() => onChangeStep(null)}>
            Hide
          </Button>
          <Button
            theme="secondary"
            onClick={() => onChangeStep(WizardSteps.Data)}
          >
            Back
          </Button>
          <Button onClick={this.handleSave}>Save</Button>
        </div>
      </div>
    );
  }
}
