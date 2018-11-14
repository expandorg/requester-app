import { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps, RequestStates } from '@gemsorg/app-utils';

import { getEligibleUsers } from '../../../../sagas/whitelistSagas';

import { eligibleUsersSelector } from '../../../../selectors/whitelistSelectors';
import { eligibleUsersStateSelector } from '../../../../selectors/uiStateSelectors';

const mapsStateToProps = state => ({
  eligibleUsers: eligibleUsersSelector(state),
  fetchState: eligibleUsersStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getEligibleUsers }, dispatch);

const DEBOUNCE_TIMEOUT = 400;

class EligibleUsers extends Component {
  static propTypes = {
    whitelist: PropTypes.arrayOf(PropTypes.shape({})),
    eligibleUsers: PropTypes.number,
    fetchState: requestStateProps.isRequired,
    getEligibleUsers: PropTypes.func.isRequired,
  };

  static defaultProps = {
    whitelist: [],
    eligibleUsers: null,
  };

  constructor(props) {
    super(props);

    this.getEligibleUsers = debounce(this.getEligibleUsers, DEBOUNCE_TIMEOUT);
  }

  componentDidMount() {
    this.getEligibleUsers();
  }

  componentDidUpdate(prevProps) {
    const { whitelist } = this.props;
    if (whitelist !== prevProps.whitelist) {
      this.getEligibleUsers();
    }
  }

  componentWillUnmount() {
    this.getEligibleUsers.clear();
  }

  getEligibleUsers = () => {
    const { whitelist } = this.props;
    this.props.getEligibleUsers(whitelist);
  };

  render() {
    const { children, fetchState, eligibleUsers } = this.props;

    const isFetching = fetchState.state === RequestStates.Fetching;

    return children({ eligibleUsers, isFetching });
  }
}

export default connect(
  mapsStateToProps,
  mapDispatchToProps
)(EligibleUsers);
