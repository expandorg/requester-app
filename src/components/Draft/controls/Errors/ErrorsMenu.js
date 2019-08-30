import React from 'react';
import PropTypes from 'prop-types';

import { Portal } from '@expandorg/components';
import { ContextMenu } from '@expandorg/components/app';

import { ReactComponent as Warning } from '../../../../assets/warning.svg';

import styles from './ErrorsMenu.module.styl';

export function ErrorsContextMenu({ pos, children, onHide }) {
  if (!pos) {
    return null;
  }
  return (
    <Portal className={styles.portal} style={{ left: pos.left, top: pos.top }}>
      <ContextMenu className={styles.menu} onHide={onHide}>
        {children}
      </ContextMenu>
    </Portal>
  );
}

ErrorsContextMenu.propTypes = {
  pos: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
  }),
  onHide: PropTypes.func.isRequired,
};

ErrorsContextMenu.defaultProps = {
  pos: null,
};

export function ErrorsMenuItem({ path, message, ...rest }) {
  return (
    <button className={styles.item} {...rest}>
      <Warning className={styles.warning} />
      <div className={styles.message}>{message}</div>
      <div className={styles.path}>{path}</div>
    </button>
  );
}

ErrorsMenuItem.propTypes = {
  path: PropTypes.string,
  message: PropTypes.string,
};

ErrorsMenuItem.defaultProps = {
  path: null,
  message: null,
};
