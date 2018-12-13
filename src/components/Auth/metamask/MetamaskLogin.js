import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestStateProps } from '@gemsorg/app-utils';

import { loginMetamaskStateSelector } from '@gemsorg/app-auth/selectors';
import { loginMetamask } from '@gemsorg/app-auth/sagas';

import { metamaskStateSelector } from '@gemsorg/app-web3/selectors';
import { MetamaskState } from '@gemsorg/app-web3';

import ErrorMessage from '../../common/ErrorMessage';
import MetamaskPromt from '../../shared/metamask/MetamaskPromt';

import styles from './styles.module.styl';

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
  loginState: loginMetamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginMetamask }, dispatch);

class MetamaskLogin extends Component {
  static propTypes = {
    metamaskState: PropTypes.string.isRequired,
    loginState: requestStateProps.isRequired,
    loginMetamask: PropTypes.func.isRequired,
  };

  state = {
    metamaskDialog: false,
    error: null,
  };

  componentWillReceiveProps({ loginState: nextState }) {
    const { loginState } = this.props;
    if (nextState.error && nextState.error !== loginState.error) {
      this.setState({ error: nextState.error });
    }
  }

  handleHide = () => {
    this.setState({ metamaskDialog: false });
  };

  handleClick = () => {
    if (this.props.metamaskState !== MetamaskState.Authorized) {
      this.setState({ metamaskDialog: true });
    } else {
      this.props.loginMetamask();
    }
  };

  render() {
    const { metamaskState } = this.props;
    const { metamaskDialog, error } = this.state;
    return (
      <div className={styles.container}>
        <button className={styles.button} onClick={this.handleClick}>
          <ins className={styles.fox} /> Sign in with MetaMask
        </button>
        {metamaskDialog && (
          <MetamaskPromt
            metamaskState={metamaskState}
            onLogin={this.props.loginMetamask}
            onHide={this.handleHide}
            error={error}
          />
        )}
        <ErrorMessage errors={error} className={styles.error} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MetamaskLogin);
