import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as MoreIcon } from '../../../../assets/more.svg';

import Menu from './Menu';
import { draftProps } from '../../../shared/propTypes';

import styles from './MenuButton.module.styl';

export default function MenuButton({ draft, onCopy, onDelete }) {
  const [menu, setMenu] = useState(false);
  const toggle = useCallback(
    (evt) => {
      evt.preventDefault();
      setMenu(!menu);
    },
    [menu, setMenu]
  );
  const hide = useCallback(() => setMenu(false), [setMenu]);

  return (
    <div className={styles.container}>
      <button onClick={toggle} className={styles.more}>
        <MoreIcon />
      </button>
      {menu && (
        <Menu draft={draft} onCopy={onCopy} onDelete={onDelete} onHide={hide} />
      )}
    </div>
  );
}

MenuButton.propTypes = {
  draft: draftProps.isRequired,
  onDelete: PropTypes.func,
  onCopy: PropTypes.func,
};

MenuButton.defaultProps = {
  onDelete: Function.prototype,
  onCopy: Function.prototype,
};
