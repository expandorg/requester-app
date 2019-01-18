import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

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
          <div className={styles.title}>Please confirm email address</div>
          <div className={styles.descriptionBold}>
            We’ve sent a confirmation email to your new email address. Please
            follow the link to confirm the change.
          </div>
          <div className={styles.actions}>
            <Button className={styles.button} onClick={onHide}>
              got it
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
