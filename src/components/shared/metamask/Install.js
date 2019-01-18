import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Actions from './Actions';

import styles from './Install.module.styl';

const Install = ({ onHide }) => (
  <div className={styles.container}>
    <div className={styles.headline}>Please Install MetaMask</div>
    <div className={styles.description}>
      To complete tasks on Expand you will need the MetaMask Chrome Extension.
      Here is how:
    </div>
    <div className={styles.video}>
      <iframe
        title="MetaMask Intro"
        className={styles.iframe}
        src="https://www.youtube.com/embed/6Gf_kRE4MJU"
        frameBorder="0"
        gesture="media"
        allow="encrypted-media"
        allowFullScreen
      />
    </div>
    <Actions onHide={onHide}>
      <a
        className={cn('gem-button', styles.install)}
        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
        rel="noopener noreferrer"
        target="_blank"
      >
        Go Install MetaMask
      </a>
    </Actions>
  </div>
);

Install.propTypes = {
  onHide: PropTypes.func.isRequired,
};

export default Install;
