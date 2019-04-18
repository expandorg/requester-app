/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as Visible } from '@expandorg/uikit/assets/visible.svg';
import { ReactComponent as Invisible } from '@expandorg/uikit/assets/invisible.svg';
import { ReactComponent as Links } from '@expandorg/uikit/assets/link.svg';

import { moduleProps } from '@expandorg/modules';

import styles from './Header.module.styl';

const isVisible = module => {
  if (!module.logic) {
    return true;
  }
  return !module.logic.show;
};

const hasLinks = () => false;

export default function Header({ module, onSelect }) {
  return (
    <div className={styles.container} onClick={onSelect}>
      <div className={styles.name}>{module.name}</div>
      <div className={styles.icons}>
        {isVisible(module) ? <Visible /> : <Invisible />}
        {hasLinks(module) && <Links />}
      </div>
    </div>
  );
}

Header.propTypes = {
  module: moduleProps.isRequired,
  onSelect: PropTypes.func.isRequired,
};
