import React from 'react';

import { Footer as UIFooter } from '@expandorg/components/app';

import styles from './Footer.module.styl';

const links = [
  {
    link: 'https://expand.org',
    text: 'Expand 2019',
    isExternal: true,
  },
  {
    link: '/toc',
    text: 'Terms of Service',
    isExternal: false,
  },
  {
    link: '/privacy',
    text: 'Privacy Policy',
    isExternal: false,
  },
  {
    link: '/help',
    text: 'Help',
    isExternal: false,
  },
  {
    link: 'https://twitter.com/xpn',
    text: 'Twitter',
    isExternal: true,
  },
  {
    link: 'https://t.me/expandorg',
    text: 'Telegram',
    isExternal: true,
  },
];

export default function Footer() {
  return <UIFooter className={styles.footer} links={links} />;
}
