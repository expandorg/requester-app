import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { WalkthroughProvider } from '@expandorg/components/app';

import styles from './Layout.module.styl';

export const FormLayout = ({ children, className, walkthrough }) => (
  <WalkthroughProvider settings={walkthrough}>
    <div className={cn(styles.container, className)}>{children}</div>
  </WalkthroughProvider>
);

FormLayout.propTypes = {
  walkthrough: PropTypes.shape({}),
  className: PropTypes.string,
};

FormLayout.defaultProps = {
  walkthrough: null,
  className: null,
};

export const Sidebar = ({ children, className, hidden }) => {
  if (hidden) {
    return null;
  }
  return <div className={cn(styles.sidebar, className)}>{children}</div>;
};

Sidebar.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
};

Sidebar.defaultProps = {
  className: null,
  hidden: false,
};

export const Content = ({ children, className }) => (
  <div className={cn(styles.content, className)}>{children}</div>
);

Content.propTypes = {
  className: PropTypes.string,
};

Content.defaultProps = {
  className: null,
};

export const Canvas = ({ children }) => (
  <div className={styles.canvas}>{children}</div>
);

export const Topbar = ({ children }) => (
  <div className={styles.topbar}>{children}</div>
);

export const Bottombar = ({ children }) => (
  <div className={styles.bottombar}>{children}</div>
);
