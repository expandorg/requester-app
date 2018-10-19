import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import deferVisible from '../../../common/deferVisibleRender';

import { ReactComponent as DataIcon } from '../../../assets/data.svg';

import styles from './PreviewTooltip.module.styl';

const PreviewTooltip = deferVisible(({ visible, top }) => (
  <div
    className={cn(styles.preview, { [styles.previewVisible]: visible })}
    style={{ top }}
  >
    <div className={styles.previewContainer}>
      <DataIcon className={styles.img} />
    </div>
  </div>
));

PreviewTooltip.propTypes = {
  visible: PropTypes.bool,
  top: PropTypes.number.isRequired,
};

export default PreviewTooltip;
