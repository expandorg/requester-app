import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestStateProps,
  RequestStates,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import Button from '../../../common/Button';
import { draftProps } from '../../../shared/propTypes';
import Hero from '../../../shared/Hero';

import { Form, Description, Actions } from '../Form';
import UserFilter from './UserFilter/UserFilter';
import EligibleUsers from './EligibleUsers';

import { updateWhitelist } from '../../../../sagas/draftsSagas';
import { updateDraftWhitelistStateSelector } from '../../../../selectors/uiStateSelectors';

import styles from './Whitelist.module.styl';

const mapsStateToProps = state => ({
  updateState: updateDraftWhitelistStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateWhitelist }, dispatch);

class Whitelist extends Component {
  static propTypes = {
    draft: draftProps.isRequired,
    updateState: requestStateProps.isRequired,
    updateWhitelist: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

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
    this.setState({ whitelist });
  };

  render() {
    const { updateState } = this.props;
    const { whitelist } = this.state;

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
              <EligibleUsers whitelist={whitelist}>
                {({ eligibleUsers, isFetching }) => (
                  <Hero
                    className={cn({ [styles.fetching]: isFetching })}
                    value={eligibleUsers}
                    title="users available"
                  />
                )}
              </EligibleUsers>
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
