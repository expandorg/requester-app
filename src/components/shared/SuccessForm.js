import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';
import { ReactComponent as Checkmark } from '../assets/checkmark-3.svg';

import styles from './serviceForms.module.styl';

export default class SuccessForm extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    button: PropTypes.string,
    onHide: PropTypes.func.isRequired,
  };

  static defaultProps = {
    button: 'Done',
  };

  render() {
    const { children, title, button, onHide } = this.props;

    return (
      <div className={styles.container}>
        <form className={styles.inner}>
          <div className={styles.icon}>
            <Checkmark
              className={styles.success}
              width={64}
              height={48}
              viewBox="0 0 64 48"
            />
          </div>
          <div className={styles.title}>{title}</div>

          {children}

          <div className={styles.actions}>
            <Button className={styles.button} onClick={onHide}>
              {button}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
