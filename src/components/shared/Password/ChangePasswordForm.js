import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';
import { userProps } from '@gemsorg/app-auth';

import Button from '../../common/Button';
import Input from '../../common/Input';
import ErrorMessage from '../../common/ErrorMessage';

import { submitStateEffect } from '../../common/submitStateEffect';

import { changePassword } from '../../../sagas/userSagas';
import { changePasswordStateSelector } from '../../../selectors/uiStateSelectors';

import styles from '../serviceForms.module.styl';

export const ChangePasswordEffect = submitStateEffect(
  changePasswordStateSelector
);

const mapStateToProps = state => ({
  editState: changePasswordStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ changePassword }, dispatch);

class ChangePasswordForm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    editState: requestStateProps.isRequired,

    onHide: PropTypes.func.isRequired,
    changePassword: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      current: '',
      password: '',
      confirm: '',
      errors: null,
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();

    const { user, editState } = this.props;
    const { current, password, confirm } = this.state;

    if (editState.state !== RequestStates.Fetching) {
      // FIXME: vartiation + correct error messaeg
      if (password !== confirm) {
        this.setState({ errors: { commonMessage: 'fixme' } });
      } else {
        this.props.changePassword(user, password, current);
      }
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value, errors: null });
  };

  handleEditFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  render() {
    const { onHide } = this.props;
    const { current, password, confirm, errors } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.inner} onSubmit={this.handleSubmit}>
          <div className={styles.title}>Change Password</div>
          <div className={styles.field}>
            <Input
              type="password"
              placeholder="Old password"
              name="current"
              value={current}
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <Input
              type="password"
              placeholder="New password"
              name="password"
              value={password}
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <Input
              type="password"
              placeholder="Re-enter new password"
              name="confirm"
              value={confirm}
              required
              onChange={this.handleInputChange}
            />
            <ErrorMessage errors={errors} className={styles.error} />
          </div>
          <div className={styles.actions}>
            <Button className={styles.button} type="submit">
              Save
            </Button>
            <Button className={styles.button} theme="grey" onClick={onHide}>
              go back
            </Button>
          </div>
          <ChangePasswordEffect onFailed={this.handleEditFailed} />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordForm);
