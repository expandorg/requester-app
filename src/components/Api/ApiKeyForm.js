import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Input, ClipboardButton, Button, Panel } from '@expandorg/components';
import { EmailConfirmed } from '@expandorg/app-account/components';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';

import { generateKey } from '../../sagas/accessTokenSagas';
import { generateAccessTokenStateSelector } from '../../selectors/uiStateSelectors';
import { accessTokenSelector } from '../../selectors/accessTokenSelectors';

import styles from './ApiKeyForm.module.styl';

const mapStateToProps = state => ({
  accessToken: accessTokenSelector(state),
  user: userSelector(state),
  submitState: generateAccessTokenStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ generateKey }, dispatch);

class ApiKeyForm extends Component {
  static propTypes = {
    accessToken: PropTypes.string,
    user: userProps.isRequired,
    submitState: requestStateProps.isRequired,
    generateKey: PropTypes.func.isRequired,
  };

  static defaultProps = {
    accessToken: null,
  };

  handleGenerateClick = evt => {
    const { user, submitState } = this.props;
    if (submitState !== RequestStates.Fetching) {
      this.props.generateKey(user);
    }
    evt.preventDefault();
  };

  render() {
    const { accessToken, user, submitState } = this.props;

    const submitting = submitState.state === RequestStates.Fetching;
    const submitted = submitState.state === RequestStates.Fetched;

    return (
      <Panel className={styles.panel}>
        <div className={styles.token}>
          {submitted && (
            <>
              <Input
                value={accessToken}
                className={styles.input}
                placeholder="API Key"
                readOnly
              />
              <ClipboardButton value={accessToken} className={styles.copy}>
                Copy
              </ClipboardButton>
            </>
          )}
          {!submitted && (
            <EmailConfirmed user={user} onConfirmed={this.handleGenerateClick}>
              {({ onToggle }) => (
                <Button
                  className={styles.generate}
                  size="small"
                  theme="blue"
                  disabled={submitting}
                  onClick={onToggle}
                >
                  generate api key
                </Button>
              )}
            </EmailConfirmed>
          )}
        </div>
        {submitted && (
          <div className={styles.alert}>
            Save your key or it will be lost if you leave this page.
          </div>
        )}
      </Panel>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeyForm);
