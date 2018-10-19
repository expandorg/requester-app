import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/Button';

import styles from './Info.module.styl';

export default class Info extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    const { onSave, onCancel } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.tips}>
            <div className={styles.title}>Tips</div>
            <div className={styles.text}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <Button
            theme="secondary"
            className={styles.preview}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button className={styles.preview} onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    );
  }
}
