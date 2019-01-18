import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@expandorg/components';

import styles from './Unlock.module.styl';

const Unlock = ({ onHide }) => (
  <div className={styles.container}>
    <div className={styles.headline}>Please Unlock MetaMask</div>
    <div className={styles.description}>Unlock MetaMask. Here is how:</div>
    <img
      className={styles.screenshot}
      src="https://j.gifs.com/jqOVoP.gif"
      alt="Unlock MetaMask"
    />
    <div className={styles.actions}>
      <Button theme="grey" className={styles.back} onClick={onHide}>
        no, go back
      </Button>
    </div>
  </div>
);

Unlock.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default Unlock;
