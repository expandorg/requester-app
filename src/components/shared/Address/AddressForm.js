import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { submitStateEffect } from '@expandorg/app-utils';
import { userProps } from '@expandorg/app-auth';

import { MetamaskState } from '@expandorg/app-web3';
import { metamaskStateSelector } from '@expandorg/app-web3/selectors';

import { assignAddress } from '@expandorg/app-account/sagas';
import { assignAddressStateSelector } from '@expandorg/app-account/selectors';

import { Button, Input, ErrorMessage } from '@expandorg/components';

import MetamaskPromt from '../metamask/MetamaskPromt';

import styles from '../serviceForms.module.styl';
import mstyles from './metamask.module.styl';

const AssignAddressEffect = submitStateEffect(assignAddressStateSelector);

const mapStateToProps = state => ({
  metamaskState: metamaskStateSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ assignAddress }, dispatch);

class AddressForm extends Component {
  static propTypes = {
    user: userProps.isRequired,
    metamaskState: PropTypes.string.isRequired,

    onHide: PropTypes.func.isRequired,
    assignAddress: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      dialog: false,
      address: props.user.address || '',
      errors: null,
    };
  }

  handleAssign = () => {
    const { user, metamaskState } = this.props;
    if (metamaskState !== MetamaskState.Authorized) {
      this.setState({ dialog: true });
    } else {
      this.props.assignAddress(user);
    }
  };

  handleHide = () => {
    this.setState({ dialog: false });
  };

  handleInputChange = ({ target }) => {
    this.setState({ address: target.value, errors: null });
  };

  handleSave = () => {
    const { user } = this.props;
    const { address } = this.state;

    if (address) {
      this.props.assignAddress(user, address);
    }
  };

  handleAssignComplete = () => {
    const { onHide } = this.props;
    onHide();
  };

  handleAssignFailed = ({ error }) => {
    this.setState({ errors: error });
  };

  render() {
    const { onHide, metamaskState } = this.props;
    const { address, dialog, errors } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.title}>Change Account Address</div>
          <div className={mstyles.metamask}>
            <button className={mstyles.assign} onClick={this.handleAssign}>
              <ins className={mstyles.fox} /> Use Metamask Address
            </button>
            {dialog && (
              <MetamaskPromt
                metamaskState={metamaskState}
                action="Assign address"
                headline=""
                description=""
                onLogin={this.props.assignAddress}
                onHide={this.handleHide}
              />
            )}
          </div>
          <div className={styles.description}>Enter address manually</div>
          <div className={styles.field}>
            <Input
              placeholder="Account Address"
              value={address}
              onChange={this.handleInputChange}
            />
            <ErrorMessage errors={errors} className={styles.error} />
          </div>
          <div className={styles.actions}>
            <Button className={styles.button} onClick={this.handleSave}>
              Save
            </Button>
            <Button className={styles.button} theme="grey" onClick={onHide}>
              go back
            </Button>
          </div>
          <AssignAddressEffect
            onComplete={this.handleAssignComplete}
            onFailed={this.handleAssignFailed}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm);
