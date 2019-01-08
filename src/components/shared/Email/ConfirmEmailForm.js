import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';

import Button from '../../common/Button';
import Input from '../../common/Input';
import ErrorMessage from '../../common/ErrorMessage';

import { confirmEmail, resendConfirmEmail } from '../../../sagas/userSagas';

import {
  confirmEmailStateSelector,
  resendConfirmEmailStateSelector,
} from '../../../selectors/uiStateSelectors';

import { ConfirmEmailEffect, ResendEffect } from './stateEffects';

import styles from '../serviceForms.module.styl';
import fstyles from './ConfirmEmailForm.module.styl';

const mapStateToProps = state => ({
  confirmState: confirmEmailStateSelector(state),
  resendState: resendConfirmEmailStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ confirmEmail, resendConfirmEmail }, dispatch);

class ConfirmEmailForm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    code: PropTypes.string,

    confirmState: requestStateProps.isRequired,
    resendState: requestStateProps.isRequired,

    onHide: PropTypes.func.isRequired,
    confirmEmail: PropTypes.func.isRequired,
    resendConfirmEmail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    code: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      code: props.code || '',
      errors: null,
      resent: false,
    };
  }

  componentDidMount() {
    const { code, user } = this.props;
    if (code) {
      this.props.confirmEmail(user, code);
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { user, confirmState } = this.props;
    const { code } = this.state;
    if (confirmState.state !== RequestStates.Fetching) {
      this.props.confirmEmail(user, code);
    }
  };

  handleResend = evt => {
    evt.preventDefault();
    const { user, resendState } = this.props;
    if (resendState.state !== RequestStates.Fetching) {
      this.props.resendConfirmEmail(user);
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ code: target.value, errors: null });
  };

  handleConfirmFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  handleResendComplete = () => {
    this.setState({ resent: true });
  };

  render() {
    const { confirmState, onHide } = this.props;
    const { code, errors, resent } = this.state;

    const confirming = confirmState.state === RequestStates.Fetching;

    return (
      <div className={styles.container}>
        <form className={styles.inner} onSubmit={this.handleSubmit}>
          <div className={styles.title}>Please confirm email address</div>
          <div className={styles.description}>
            Enter the confirmation code that was sent to your email
          </div>
          <div className={styles.field}>
            <Input
              placeholder="Confirmation Code"
              value={code}
              required
              onChange={this.handleInputChange}
            />
            <ErrorMessage errors={errors} className={fstyles.error} />
          </div>
          <div className={fstyles.resend}>
            {!resent ? (
              <span className={fstyles.text}>
                Didn&apos;t get the email? We can
                <button className={fstyles.btn} onClick={this.handleResend}>
                  resend
                </button>
              </span>
            ) : (
              <span className={fstyles.resent}>
                Confirmation email has been resent
              </span>
            )}
          </div>
          <div className={styles.actions}>
            <Button
              className={styles.button}
              type="submit"
              disabled={confirming}
            >
              Confirm
            </Button>
            <Button
              className={styles.button}
              theme="grey"
              onClick={onHide}
              disabled={confirming}
            >
              go back
            </Button>
          </div>
          <ResendEffect onComplete={this.handleResendComplete} />
          <ConfirmEmailEffect onFailed={this.handleConfirmFailed} />
        </form>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmEmailForm);
