import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import { validateForm } from '@expandorg/validation';

import { Input, Button, Dropdown } from '@expandorg/components';

import { draftProps } from '../../../shared/propTypes';

import { Form, Description, Field, Fieldset, Toggle, Actions } from '../Form';

import { settingsRules } from '../../../../model/draft';
import { VerificationType } from '../../../../model/enums';

import styles from './Settings.module.styl';

const options = [
  { value: VerificationType.Requester, label: 'Manual: Verify it yourself' },
  {
    value: VerificationType.Consensus,
    label: 'Consensus',
  },
  // { value: VerificationType.AuditWhitelist, label: 'Whitelist' },
];

const getInitialState = draft => {
  const { funding, verification } = draft;

  return {
    name: draft.name || '',
    description: draft.description || '',
    staking: !!funding.requirement,
    stake: `${funding.requirement || 0}`,
    callbackUrl: (draft && draft.callbackUrl) || '',
    verificationModule: verification.module || VerificationType.Requester,
    agreementCount: `${verification.agreementCount || ''}`,
  };
};

const getSettings = settings => ({
  ...settings,
  stake: +settings.stake,
  agreementCount: +settings.agreementCount,
});

export default class Settings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.nameInput = createRef();
    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      errors: null,
      settings: getInitialState(props.draft),
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        errors: null,
        settings: getInitialState(draft),
      };
    }
    return null;
  }

  componentDidMount() {
    this.nameInput.current.focus();
  }

  handleSubmit = () => {
    const { onNext, isSubmitting } = this.props;
    if (isSubmitting) {
      return;
    }
    const { settings } = this.state;

    const errors = validateForm(settings, settingsRules);
    if (errors) {
      this.setState({ errors });
    } else {
      onNext(getSettings(settings));
    }
  };

  // handleChangeLogo = logo => {
  //   this.setState(({ settings }) => ({
  //     settings: { ...settings, logo },
  //   }));
  // };

  handleInputChange = ({ target }) => {
    this.setState(({ settings }) => ({
      settings: { ...settings, [target.name]: target.value },
    }));
  };

  handleChangeStaking = value => {
    this.setState(({ settings }) => ({
      settings: {
        ...settings,
        staking: value,
        stake: value ? settings.stake : '',
      },
    }));
  };

  handleChangeVerification = value => {
    this.setState(({ settings }) => ({
      settings: { ...settings, verificationModule: value },
    }));
  };

  handleBack = evt => {
    evt.preventDefault();
    const { onBack } = this.props;
    onBack();
  };

  render() {
    const { settings, errors, isSubmitting } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description className={styles.desc}>
            Enter your project details to help you workers find your task.
          </Description>
          {/* <UploadLogo
            logo={settings.logo}
            onChangeLogo={this.handleChangeLogo}
          /> */}
          <Field
            tooltip={
              <span>
                Give this task a title that is easy for your workers to
                understand e.g. Nature Image Labelling
              </span>
            }
            name="name"
            errors={errors}
          >
            <Input
              ref={this.nameInput}
              placeholder="Title *"
              name="name"
              error={!!(errors && errors.name)}
              value={settings.name}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field
            tooltip="Provide a concise description about the task that is easy to understand for your worker e.g. Label 100 images containing objects belonging to nature"
            name="description"
            errors={errors}
          >
            <Input
              placeholder="Description *"
              name="description"
              error={!!(errors && errors.description)}
              value={settings.description}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field>
            <Toggle
              tooltip={
                <span>
                  Staking helps you to capture high quality workers by asking
                  <br />
                  them to invest a token(s) beforehand to promise you that the
                  <br />
                  task will be completed accurately
                </span>
              }
              value={settings.staking}
              label="Staking"
              name="staking"
              onChange={this.handleChangeStaking}
            />
          </Field>
          {settings.staking && (
            <>
              <Field tooltip="How much to stake?">
                <Input
                  placeholder="How much to stake?"
                  name="stake"
                  value={settings.stake}
                  onChange={this.handleInputChange}
                />
              </Field>
            </>
          )}
          <Field
            tooltip={
              <span>
                Only applicable to those who are connecting
                <br /> their data through the API.
                <br />
                Your results will be sent to the url provided.
              </span>
            }
          >
            <Input
              placeholder="Callback Url"
              name="callbackUrl"
              value={settings.callbackUrl}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field>
            <Dropdown
              value={settings.verificationModule}
              label="Verification Type"
              options={options}
              onChange={this.handleChangeVerification}
            />
          </Field>
          {settings.verificationModule === VerificationType.Consensus && (
            <Field
              tooltip={
                <span>
                  Enter how many workers need to get the
                  <br />
                  right answer before the task is verified.
                </span>
              }
            >
              <Input
                placeholder="Agreement count"
                name="agreementCount"
                value={settings.agreementCount}
                onChange={this.handleInputChange}
              />
            </Field>
          )}
        </Fieldset>
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button disable={isSubmitting} type="submit">
            Next
          </Button>
        </Actions>
      </Form>
    );
  }
}
