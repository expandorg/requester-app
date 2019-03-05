import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import Toolbar from './Toolbar/Toolbar';

import styles from './FormContainer.module.styl';

export default function FormContainer({
  modules,
  title,
  children,
  onCancel,
  varsSample,
  selected,
  onSave,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.form}>{children}</div>
        <div className={cn(styles.spacer, { [styles.expanded]: !!selected })} />
      </div>
      <Toolbar
        modules={modules}
        onSave={onSave}
        onCancel={onCancel}
        title={title}
        varsSample={varsSample}
      />
    </div>
  );
}

FormContainer.propTypes = {
  modules: PropTypes.arrayOf(moduleProps).isRequired,
  selected: PropTypes.arrayOf(PropTypes.number),
  title: PropTypes.string.isRequired,
  varsSample: PropTypes.object, // eslint-disable-line
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

FormContainer.defaultProps = {
  varsSample: null,
  selected: null,
};
