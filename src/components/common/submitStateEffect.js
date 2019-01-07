// @flow
import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

type SubmitState = {
  state: string,
  error?: any,
};

type Props = {
  submitState: SubmitState,
  onStart?: (current: SubmitState) => void,
  onComplete?: (current: SubmitState) => void,
  onFailed?: (current: SubmitState) => void,
  children: any,
};

export class SubmitStateEffect extends Component<Props> {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    onStart: PropTypes.func,
    onComplete: PropTypes.func,
    onFailed: PropTypes.func,
  };

  static defaultProps = {
    onStart: null,
    onComplete: null,
    onFailed: null,
  };

  componentDidUpdate({
    submitState: prev,
    onStart,
    onComplete,
    onFailed,
  }: Props) {
    const { submitState } = this.props;
    const wasFetching = prev.state === RequestStates.Fetching;

    if (
      !wasFetching &&
      submitState.state === RequestStates.Fetching &&
      onStart
    ) {
      onStart(submitState);
    }

    if (
      wasFetching &&
      submitState.state === RequestStates.Fetched &&
      onComplete
    ) {
      onComplete(submitState);
    }
    if (
      wasFetching &&
      submitState.state === RequestStates.FetchError &&
      onFailed
    ) {
      onFailed(submitState);
    }
  }

  render() {
    const { children } = this.props;
    if (!children) {
      return null;
    }
    return children;
  }
}

export const submitStateEffect = (
  submitSelector: (glob: Object) => SubmitState
) => {
  const mapStateToProps = state => ({
    submitState: submitSelector(state),
  });
  return connect(mapStateToProps)(SubmitStateEffect);
};
