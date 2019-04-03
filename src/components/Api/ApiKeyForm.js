import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Input, ClipboardButton, Panel } from '@expandorg/components';
import { EmailConfirmed } from '@expandorg/app-account/components';

import { requestStateProps, RequestStates } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';
import { userSelector } from '@expandorg/app-auth/selectors';

import { generateKey } from '../../sagas/accessTokenSagas';
import { generateAccessTokenStateSelector } from '../../selectors/uiStateSelectors';
import { accessTokenSelector } from '../../selectors/accessTokenSelectors';

import ConfirmationDialog from '../shared/ConfirmationDialog';

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

  state = {
    confirm: false,
  };

  handleGenerateClick = evt => {
    const { user, submitState } = this.props;
    this.setState({ confirm: false });
    if (submitState !== RequestStates.Fetching) {
      this.props.generateKey(user);
    }
    evt.preventDefault();
  };

  handleToggleConfirm = () => {
    this.setState(({ confirm }) => ({ confirm: !confirm }));
  };

  render() {
    const { accessToken, user, submitState } = this.props;
    const { confirm } = this.state;

    const submitting = submitState.state === RequestStates.Fetching;
    const submitted = submitState.state === RequestStates.Fetched;

    return (
      <>
        {submitted && (
          <Panel className={styles.panel}>
            <div className={styles.token}>
              <Input
                value={accessToken}
                className={styles.input}
                placeholder="API Key"
                readOnly
              />
              <ClipboardButton value={accessToken} className={styles.copy}>
                Copy
              </ClipboardButton>
            </div>
          </Panel>
        )}
        {!submitted && (
          <>
            <EmailConfirmed user={user} onConfirmed={this.handleToggleConfirm}>
              {({ onToggle }) => (
                <button
                  className={styles.generate}
                  disabled={submitting}
                  onClick={onToggle}
                >
                  <div className={styles.plus}>+</div>
                  generate api key
                </button>
              )}
            </EmailConfirmed>
          </>
        )}
        {confirm && (
          <ConfirmationDialog
            title=""
            icon="warning"
            confirmation="Expand does not store API keys. Please keep this safe."
            confirmCaption="i understand"
            hideCaption={null}
            onHide={this.handleToggleConfirm}
            onConfirm={this.handleGenerateClick}
          />
        )}
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiKeyForm);
