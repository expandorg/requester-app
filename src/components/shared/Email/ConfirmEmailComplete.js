import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Checkmark } from '../../assets/checkmark-3.svg';

import Button from '../../common/Button';

import styles from '../serviceForms.module.styl';

export default class EditEmailComplete extends Component {
  static propTypes = {
    onHide: PropTypes.func.isRequired,
  };

  render() {
    const { onHide } = this.props;

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

          <div className={styles.title}>Success! Email address updated!</div>
          <div className={styles.actions}>
            <Button className={styles.button} onClick={onHide}>
              Done
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
