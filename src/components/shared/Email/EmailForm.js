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

import { editEmail } from '../../../sagas/userSagas';
import { editEmailStateSelector } from '../../../selectors/uiStateSelectors';

import styles from '../serviceForms.module.styl';

const EditEmailEffect = submitStateEffect(editEmailStateSelector);

const mapStateToProps = state => ({
  editState: editEmailStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ editEmail }, dispatch);

class EmailForm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    editState: requestStateProps.isRequired,

    onHide: PropTypes.func.isRequired,
    editEmail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirm: '',
      errors: null,
    };
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const { user, editState } = this.props;
    const { email, confirm } = this.state;
    if (editState.state !== RequestStates.Fetching) {
      // FIXME: vartiation + correct error messaeg
      if (email !== confirm) {
        this.setState({ errors: { commonMessage: 'fixme' } });
      } else {
        this.props.editEmail(user, email);
      }
    }
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value, errors: null });
  };

  handleEditComplete = () => {
    const { onHide } = this.props;
    onHide();
  };

  handleEditFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  render() {
    const { onHide, user } = this.props;
    const { email, confirm, errors } = this.state;

    return (
      <div className={styles.container}>
        <form className={styles.inner} onSubmit={this.handleSubmit}>
          <div className={styles.title}>Change Email Address</div>
          <div className={styles.descriptionBold}>{user.email}</div>
          <div className={styles.field}>
            <Input
              type="email"
              placeholder="New email address"
              name="email"
              value={email}
              required
              onChange={this.handleInputChange}
            />
          </div>
          <div className={styles.field}>
            <Input
              type="email"
              placeholder="Re-enter new email address"
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
          <EditEmailEffect
            onComplete={this.handleEditComplete}
            onFailed={this.handleEditFailed}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailForm);
