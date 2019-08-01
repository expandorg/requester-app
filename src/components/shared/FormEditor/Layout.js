import React from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

import { Drawer } from '@expandorg/components';
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

export const Sidebar = ({ children, className, visible }) => {
  return (
    <Drawer
      className={cn(styles.sidebar, className)}
      width={240}
      visible={visible}
    >
      {visible && children}
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
};

Sidebar.defaultProps = {
  className: null,
  visible: false,
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

export const Topbar = ({ children, className }) => (
  <div className={cn(styles.topbar, className)}>{children}</div>
);

Topbar.propTypes = {
  className: PropTypes.string,
};

Topbar.defaultProps = {
  className: null,
};

export const Bottombar = ({ children }) => (
  <div className={styles.bottombar}>{children}</div>
);
