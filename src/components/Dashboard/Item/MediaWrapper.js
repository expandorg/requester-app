/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { DraftStatus } from '../../../model/enums';

import styles from './styles.module.styl';
import { draftProps } from '../../shared/propTypes';

export default function MediaWrapper({ draft, children, onNotify, isMobile }) {
  const notPublished =
    draft.status === DraftStatus.draft || draft.status === DraftStatus.pending;

  const notify = useCallback(() => {
    onNotify('error', 'Hey, we don’t currently support mobile devices.');
  }, [onNotify]);

  if (isMobile && notPublished) {
    return (
      <div className={cn(styles.container, styles.task)} onClick={notify}>
        {children}
      </div>
    );
  }
  return (
    <Link
      className={cn(styles.container, styles.task)}
      to={notPublished ? `/draft/${draft.id}` : `/job/${draft.jobId}`}
    >
      {children}
    </Link>
  );
}

MediaWrapper.propTypes = {
  draft: draftProps.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onNotify: PropTypes.func.isRequired,
};
