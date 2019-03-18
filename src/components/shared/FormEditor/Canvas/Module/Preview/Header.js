/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

// import { ReactComponent as Visible } from '@expandorg/uikit/assets/visible.svg';
// import { ReactComponent as Invisible } from '@expandorg/uikit/assets/invisible.svg';
// import { ReactComponent as Links } from '@expandorg/uikit/assets/link.svg';

import { moduleProps } from '@expandorg/modules';

// import IconButton from '../../../../../common/IconButton';

import styles from './Header.module.styl';

// const isVisible = module => {
//   if (!module.logic) {
//     return true;
//   }
//   return !module.logic.show;
// };

// const hasLinks = () => false;

export default function Header({ module, onSelect /* onSelectLogic */ }) {
  return (
    <div className={styles.container}>
      <div className={styles.name} onClick={onSelect}>
        {module.name}
      </div>
      <div className={styles.icons}>
        {/* <IconButton className={styles.button} onClick={onSelectLogic}>
          {isVisible(module) ? <Visible /> : <Invisible />}
        </IconButton>
        {hasLinks(module) && (
          <IconButton className={styles.button}>
            <Links />
          </IconButton>
        )} */}
      </div>
    </div>
  );
}

Header.propTypes = {
  module: moduleProps.isRequired,
  onSelect: PropTypes.func.isRequired,
  // onSelectLogic: PropTypes.func.isRequired,
};

Header.defaultProps = {};
