import React from 'react';

import UIPage from '../common/Page';
import { Notifications } from './Notifications';

export default function Page({ children, ...rest }) {
  return (
    <UIPage {...rest}>
      {children}
      <Notifications />
    </UIPage>
  );
}
