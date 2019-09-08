import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Page as UIPage } from '@expandorg/components/app';

import Footer from './Footer';
import Notifications from './Notifications';

import styles from './Page.module.styl';

export default function Page({ children, footer, className, ...rest }) {
  return (
    <UIPage className={cn(styles.content, className)} {...rest}>
      <div className={styles.container}>{children}</div>
      {footer && <Footer />}
      <Notifications />
    </UIPage>
  );
}

Page.propTypes = {
  className: PropTypes.string,
  footer: PropTypes.bool,
};

Page.defaultProps = {
  className: null,
  footer: true,
};
