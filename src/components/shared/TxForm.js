import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SuccessForm from './SuccessForm';

import styles from './TxForm.module.styl';

export default class TxForm extends Component {
  static propTypes = {
    tx: PropTypes.string.isRequired,
  };

  render() {
    const { tx, ...rest } = this.props;

    return (
      <SuccessForm {...rest}>
        <div className={styles.tx}>{tx}</div>
      </SuccessForm>
    );
  }
}
