import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorMessage from '../../common/ErrorMessage';
import Button from '../../common/Button';

import Actions from './Actions';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    action: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    error: PropTypes.string,
    onAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const { onAction, action, headline, description, error } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.headline}>{headline}</div>
        <div className={styles.description}>{description}- </div>
        <ErrorMessage errors={error} className={styles.error} />
        <div className={styles.screenshot} />
        <Actions className={styles.actions}>
          <Button className={styles.action} onClick={onAction}>
            {action}
          </Button>
        </Actions>
      </div>
    );
  }
}
