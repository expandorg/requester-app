import React from 'react';

import cn from 'classnames';

import { Tooltip } from '@gemsorg/components';

import { ReactComponent as InfoMark } from '../assets/i.svg';

import styles from './I.module.styl';

const I = Tooltip(({ className, children, ...rest }) => (
  <span className={cn(styles.i, className)} {...rest}>
    <InfoMark />
    {children}
  </span>
));

export default I;
