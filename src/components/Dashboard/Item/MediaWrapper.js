/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { DraftStatus } from '../../../model/enums';
import { draftProps } from '../../shared/propTypes';

import styles from './styles.module.styl';

export default function MediaWrapper({
  draft,
  children,
  onNotify,
  isMobile,
  highlight,
}) {
  const notPublished =
    draft.status === DraftStatus.draft || draft.status === DraftStatus.pending;

  const notify = useCallback(() => {
    onNotify('error', 'Hey, we don’t currently support mobile devices.');
  }, [onNotify]);

  const classes = cn(styles.container, styles.task, {
    [styles.highlight]: highlight,
  });

  if (isMobile && notPublished) {
    return (
      <div className={classes} onClick={notify}>
        {children}
      </div>
    );
  }
  const url = notPublished ? `/draft/${draft.id}` : `/job/${draft.jobId}`;
  return (
    <Link className={classes} to={url}>
      {children}
    </Link>
  );
}

MediaWrapper.propTypes = {
  draft: draftProps.isRequired,
  isMobile: PropTypes.bool.isRequired,
  highlight: PropTypes.bool.isRequired,
  onNotify: PropTypes.func.isRequired,
};

MediaWrapper.defoultProps = {
  highlight: false,
};
