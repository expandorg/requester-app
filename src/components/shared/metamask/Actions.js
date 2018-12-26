import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Button from '../../common/Button';

import styles from './Actions.module.styl';

const Actions = ({ onHide, children, className }) => (
  <div className={cn(styles.actions, className)}>
    {children}
    {onHide && (
      <Button theme="grey" className={styles.back} onClick={onHide}>
        no, go back
      </Button>
    )}
  </div>
);

Actions.propTypes = {
  onHide: PropTypes.func,
  className: PropTypes.string,
};

Actions.defaultProps = {
  onHide: null,
  className: null,
};

export default Actions;
