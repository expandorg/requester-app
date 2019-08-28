import React from 'react';

import { Navbar as UINavbar } from '@expandorg/components/app';

import './Navbar.styl';

export default function Navbar({ children, ...rest }) {
  return <UINavbar {...rest}>{children}</UINavbar>;
}
