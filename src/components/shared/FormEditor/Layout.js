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

export const Sidebar = ({ children, className }) => (
  <div className={cn(styles.sidebar, className)}>{children}</div>
);

Sidebar.propTypes = {
  className: PropTypes.string,
};

Sidebar.defaultProps = {
  className: null,
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

export const Bottombar = ({ children }) => (
  <div className={styles.bottombar}>{children}</div>
);
