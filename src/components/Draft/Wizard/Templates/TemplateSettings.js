import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import Button from '../../../common/Button';
import Input from '../../../common/Input';

import ConfirmationDialog from '../../../shared/ConfirmationDialog';
import { Form, Description, Actions, Field, Fieldset, Toggle } from '../Form';

import { hasTemplate } from '../../wizard';
import { selectTemplate } from '../../../../sagas/draftsSagas';
import { draftProps } from '../../../shared/propTypes';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ selectTemplate }, dispatch);

class TemplatesList extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    submitState: requestStateProps.isRequired,
    selected: PropTypes.string,

    onBack: PropTypes.func.isRequired,
    selectTemplate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
  };

  state = {
    confirmDialog: false,
    settings: {
      staking: false,
      stake: '',
      deduct: false,
    },
  };

  handleSubmit = () => {
    const { selected, draft, submitState } = this.props;
    const { settings } = this.state;
    if (submitState.state !== RequestStates.Fetching) {
      if (hasTemplate(draft) && draft.templateId !== selected) {
        this.setState({ confirmDialog: true });
      } else {
        this.props.selectTemplate(draft.id, selected, settings);
      }
    }
  };

  handleConfirm = () => {
    const { draft, selected } = this.props;
    const { settings } = this.state;
    this.setState({ confirmDialog: false });
    this.props.selectTemplate(draft.id, selected, settings);
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

  render() {
    const { selected, onBack } = this.props;
    const { confirmDialog, settings } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Field tooltip="How much to stake?">
            <Toggle
              value={settings.staking}
              label="Staking"
              name="staking"
              onChange={this.handleChangeStaking}
            />
          </Field>
          {settings.staking && (
            <Field tooltip="How much to stake?">
              <Input
                placeholder="How much to stake?"
                name="stake"
                value={settings.stake}
                onChange={this.handleInputChange}
              />
            </Field>
          )}
          <Field tooltip="How much to stake?">
            <Toggle
              label="Deduct stake if fail?"
              name="deduct"
              value={settings.deduct}
              onChange={this.handleToggleChange}
            />
          </Field>
        </Fieldset>
        <Actions>
          <Button theme="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={selected === null}>
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
      </Form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TemplatesList);
