import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Card } from '../../../assets/creditcard.svg';

import Input from '../../../common/Input';
import Button from '../../../common/Button';

import DepositDialog from '../../../shared/Deposit/DepositDialog';

import {
  Form,
  Description,
  Field,
  Fieldset,
  Actions,
  Hero,
  HeroWarning,
} from '../Form';

import styles from './Payments.module.styl';

export default class Payments extends Component {
  static propTypes = {
    onBack: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  state = {
    pay: '',
    earned: '',
    dialog: false,
  };

  handleSubmit = () => {
    const { onNext } = this.props;
    onNext();
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

  handleToggle = evt => {
    if (evt) {
      evt.preventDefault();
    }
    this.setState(({ dialog }) => ({ dialog: !dialog }));
  };

  render() {
    const { pay, earned, dialog } = this.state;
    const insufficent = false;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Fieldset>
          <Description>Description about this step goes here.</Description>
          <Hero value={200} title="gems available" />
          {!insufficent && (
            <>
              <Field tooltip="Pay for Task *">
                <Input
                  placeholder="Pay for Task *"
                  name="pay"
                  value={pay}
                  onChange={this.handleInputChange}
                />
              </Field>
              <Field tooltip="Amount Earned per Task *">
                <Input
                  placeholder="Amount Earned per Task *"
                  name="earned"
                  value={earned}
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
              You do not have enough gems.
              <br />
              Would you like to deposit some gems?
            </HeroWarning>
          )}
          <Field>
            <button
              type="button"
              className={styles.deposit}
              onClick={this.handleToggle}
            >
              deposit gems
            </button>
          </Field>
        </Fieldset>
        <Actions>
          <Button theme="secondary" onClick={this.handleBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Actions>
        {dialog && <DepositDialog onHide={this.handleToggle} />}
      </Form>
    );
  }
}
