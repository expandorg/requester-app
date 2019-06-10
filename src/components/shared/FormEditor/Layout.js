import React from 'react';

import { WalkthroughProvider, WalkthroughPin } from '@expandorg/components/app';
import help from './model/help';

import styles from './Layout.module.styl';

export const FormLayout = ({ children }) => (
  <WalkthroughProvider settings={help}>
    <div className={styles.container}>{children}</div>
    <WalkthroughPin id="search" className={styles.serachPin} />
    <WalkthroughPin id="components" className={styles.componentsPin} />
  </WalkthroughProvider>
);

export const Left = ({ children }) => (
  <div className={styles.sidebar}>{children}</div>
);

export const Content = ({ children }) => (
  <div className={styles.content}>{children}</div>
);
