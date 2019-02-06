import React from 'react';
import PropTypes from 'prop-types';

import { Page as UIPage } from '@expandorg/components/app';

import Footer from './Footer';
import Notifications from './Notifications';

import styles from './Page.module.styl';

export default function Page({ children, footer, ...rest }) {
  return (
    <UIPage {...rest}>
      <div className={styles.container}>{children}</div>
      {footer && <Footer />}
      <Notifications />
    </UIPage>
  );
}

Page.propTypes = {
  footer: PropTypes.bool,
};

Page.defaultProps = {
  footer: true,
};
