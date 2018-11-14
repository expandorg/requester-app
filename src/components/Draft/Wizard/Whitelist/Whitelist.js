import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';
import debounce from 'debounce';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import Button from '../../../common/Button';
import { SubmitStateEffect } from '../../../common/submitStateEffect';
import { draftProps } from '../../../shared/propTypes';
import Hero from '../../../shared/Hero';

import { Form, Description, Actions } from '../Form';
import UserFilter from './UserFilter/UserFilter';

import { getEliligibleUsers } from '../../../../sagas/whitelistSagas';
import { updateWhitelist } from '../../../../sagas/draftsSagas';

import { eliligibleUsersSelector } from '../../../../selectors/whitelistSelectors';
import {
  updateDraftWhitelistStateSelector,
  eligibleUsersStateSelector,
} from '../../../../selectors/uiStateSelectors';

import styles from './Whitelist.module.styl';

const mapsStateToProps = state => ({
  eliligibleUsers: eliligibleUsersSelector(state),
  updateState: updateDraftWhitelistStateSelector(state),
  fetchState: eligibleUsersStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getEliligibleUsers, updateWhitelist }, dispatch);

const DEBOUNCE_TIMEOUT = 400;

class Whitelist extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    eliligibleUsers: PropTypes.number,

    updateState: requestStateProps.isRequired,
    fetchState: requestStateProps.isRequired,

    updateWhitelist: PropTypes.func.isRequired,
    getEliligibleUsers: PropTypes.func.isRequired,

    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  static defaultProps = {
    eliligibleUsers: null,
  };

  constructor(props) {
    super(props);

    this.getEliligibleUsers = debounce(
      this.getEliligibleUsers,
      DEBOUNCE_TIMEOUT
    );

    this.state = {
      draft: props.draft, // eslint-disable-line react/no-unused-state
      whitelist: props.draft.whitelist || [],
    };
  }

  static getDerivedStateFromProps({ draft }, state) {
    if (draft !== state.draft) {
      return {
        draft,
        whitelist: draft.whitelist || [],
      };
    }
    return null;
  }

  componentDidMount() {
    this.getEliligibleUsers();
  }

  componentWillUnmount() {
    this.getEliligibleUsers.clear();
  }

  getEliligibleUsers = () => {
    const { whitelist } = this.state;
    this.props.getEliligibleUsers(whitelist);
  };

  handleSubmit = () => {
    const { updateState, draft } = this.props;
    const { whitelist } = this.state;
    if (updateState.state !== RequestStates.Fetching) {
      this.props.updateWhitelist(draft.id, whitelist);
    }
  };

  handleSaveComplete = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleBack = evt => {
    const { onBack } = this.props;
    onBack();

    evt.preventDefault();
  };

  handleChange = whitelist => {
    this.setState({ whitelist }, this.getEliligibleUsers);
  };

  render() {
    const { fetchState, updateState, eliligibleUsers } = this.props;
    const { whitelist } = this.state;

    const isFetching = fetchState.state === RequestStates.Fetching;

    return (
      <SubmitStateEffect
        submitState={updateState}
        onComplete={this.handleSaveComplete}
      >
        <Form onSubmit={this.handleSubmit}>
          <div className={styles.container}>
            <div className={styles.inner}>
              <Description>
                The second step is uploading your data and assigning variables.
              </Description>
              <Hero
                className={cn({ [styles.fetching]: isFetching })}
                value={eliligibleUsers}
                title="users available"
              />
              <UserFilter
                className={styles.filters}
                filters={whitelist}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <Actions>
            <Button theme="secondary" onClick={this.handleBack}>
              Back
            </Button>
            <Button type="submit">Next</Button>
          </Actions>
        </Form>
      </SubmitStateEffect>
    );
  }
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(Whitelist);
