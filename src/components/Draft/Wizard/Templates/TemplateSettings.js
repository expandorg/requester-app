import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';

import { Input, Button, Dropdown } from '@expandorg/components';

import ConfirmationDialog from '../../../shared/ConfirmationDialog';
import { Description, Actions, Field, Fieldset, Toggle } from '../Form';

import { hasTemplate } from '../../wizard';
import { selectTemplate } from '../../../../sagas/draftsSagas';
import { draftProps, taskTemplateProps } from '../../../shared/propTypes';
import { VerificationType } from '../../../../model/enums';

import styles from './TemplateSettings.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTemplate }, dispatch);

const getOnboarding = o => o && o.onboarding;
const getFunding = o => o && o.funding;
const getVerification = o => o && o.verification;

const avaialableVerification = [
  VerificationType.Consensus,
  VerificationType.AuditWhitelist,
];

const getInitialState = (draft, template) => {
  const has = hasTemplate(draft);

  const funding = getFunding(has ? draft : template);
  const onboarding = getOnboarding(has ? draft : template);
  const v = getVerification(has ? draft : template);

  return {
    staking: !!(funding && funding.requirement),
    stake: (funding && `${funding.requirement || 0}`) || '',
    callbackUrl: (draft && draft.callbackUrl) || '',
    onboardingSuccessMessage: (onboarding && onboarding.successMessage) || '',
    onboardingFailureMessage: (onboarding && onboarding.failureMessage) || '',
    // deduct: (draft && draft.deduct) || false,
    verificationModule: (v && v.module) || 'noop',
    agreementCount: (v && `${v.agreementCount || 0}`) || '',
  };
};

const getTempateSettings = settings => ({
  staking: settings.staking,
  stake: +settings.stake,
  // deduct: settings.deduct,
  callbackUrl: settings.callbackUrl,
  onboardingSuccessMessage: settings.onboardingSuccessMessage,
  onboardingFailureMessage: settings.onboardingFailureMessage,
  verificationModule: settings.verificationModule,
  agreementCount: +settings.agreementCount,
});

class TemplateSettings extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,
    template: taskTemplateProps,
    selected: PropTypes.string,

    onBack: PropTypes.func.isRequired,
    selectTemplate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
    template: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirmDialog: false,
      draft: props.draft, // eslint-disable-line react/no-unused-state
      settings: getInitialState(props.draft, props.template),
    };
  }

  static getDerivedStateFromProps({ draft, template }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        settings: getInitialState(draft, template),
      };
    }
    return null;
  }

  handleSubmit = () => {
    const { selected, draft, submitState } = this.props;
    const { settings } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      if (hasTemplate(draft) && draft.templateId !== selected) {
        this.setState({ confirmDialog: true });
      } else {
        const templateSettings = getTempateSettings(settings);
        this.props.selectTemplate(draft.id, selected, templateSettings);
      }
    }
  };

  handleConfirm = () => {
    const { draft, selected } = this.props;
    const { settings } = this.state;
    this.setState({ confirmDialog: false });
    const templateSettings = getTempateSettings(settings);
    this.props.selectTemplate(draft.id, selected, templateSettings);
  };

  handleToggleConfirm = () => {
    this.setState(({ confirmDialog }) => ({ confirmDialog: !confirmDialog }));
  };

  handleInputChange = ({ target }) => {
    this.setState(({ settings }) => ({
      settings: { ...settings, [target.name]: target.value },
    }));
  };

  handleToggleChange = (value, { target }) => {
    this.setState(({ settings }) => ({
      settings: { ...settings, [target.name]: value },
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

  handleToggleVerification = value => {
    this.setState(({ settings }) => ({
      settings: {
        ...settings,
        verificationModule: value
          ? VerificationType.Consensus
          : VerificationType.Noop,
      },
    }));
  };

  render() {
    const { selected, onBack } = this.props;
    const { confirmDialog, settings } = this.state;

    return (
      <div className={styles.outer}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Field>
            <Toggle
              tooltip="How much to stake?"
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
              {/* <Field>
                <Toggle
                  tooltip="Deduct stake if fail?"
                  label="Deduct stake if fail?"
                  name="deduct"
                  value={settings.deduct}
                  onChange={this.handleToggleChange}
                />
              </Field> */}
            </>
          )}
          <Field tooltip="callback Url">
            <Input
              placeholder="Callback Url"
              name="callbackUrl"
              value={settings.callbackUrl}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field tooltip="Onboarding Success Message" className={styles.br}>
            <Input
              placeholder="Onboarding Success Message"
              name="onboardingSuccessMessage"
              value={settings.onboardingSuccessMessage}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field tooltip="Onboarding Failure Message">
            <Input
              placeholder="Onboarding Failure Message"
              name="onboardingFailureMessage"
              value={settings.onboardingFailureMessage}
              onChange={this.handleInputChange}
            />
          </Field>
          <Field>
            <Toggle
              tooltip="Verification"
              value={settings.verificationModule !== VerificationType.Noop}
              label="Use Verification"
              name="verificationModule"
              onChange={this.handleToggleVerification}
            />
          </Field>
          {settings.verificationModule !== VerificationType.Noop && (
            <Field>
              <Dropdown
                value={settings.verificationModule}
                label="Verification Type"
                options={avaialableVerification}
                onChange={this.handleChangeVerification}
              />
            </Field>
          )}
          {settings.verificationModule === VerificationType.Consensus && (
            <Field tooltip="Agreement count">
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
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
          <Button disabled={selected === null} onClick={this.handleSubmit}>
            Next
          </Button>
        </Actions>
        {confirmDialog && (
          <ConfirmationDialog
            title="You already have an active template."
            confirmation="If you change it all data will be lost. Are you sure you want to continue?"
            onHide={this.handleToggleConfirm}
            onConfirm={this.handleConfirm}
          />
        )}
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TemplateSettings);
