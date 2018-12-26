import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../../common/ErrorMessage';
import Button from '../../common/Button';

import Actions from './Actions';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    error: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const { onLogin, action, error } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.description}>
          (similar to the above). Click below to log in.
        </div>
        <ErrorMessage errors={error} className={styles.error} />
        <div className={styles.screenshot} />
        <Actions className={styles.actions}>
          <Button className={styles.login} onClick={onLogin}>
            {action}
          </Button>
        </Actions>
      </div>
    );
  }
}
