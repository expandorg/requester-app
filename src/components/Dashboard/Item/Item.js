import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { JobLogo } from '@expandorg/components/app';

import MenuButton from './Menu/MenuButton';
import StatusTitle from './StatusTitle';
import MediaWrapper from './MediaWrapper';

import styles from './styles.module.styl';
import { draftProps } from '../../shared/propTypes';

const highlighted = new Set();

export default function Item({ draft, onDelete, onCopy, isMobile, onNotify }) {
  const [highlight, setHighlight] = useState(
    draft.isCopy && !highlighted.has(draft.id)
  );

  useEffect(() => {
    if (highlight && !highlighted.has(draft.id)) {
      highlighted.add(draft.id);
      setTimeout(() => setHighlight(false), 0);
    }
  }, [draft.id, highlight]);

  return (
    <MediaWrapper
      highlight={highlight}
      draft={draft}
      isMobile={isMobile}
      onNotify={onNotify}
    >
      <div className={styles.actions}>
        <MenuButton draft={draft} onDelete={onDelete} onCopy={onCopy} />
      </div>
      <div className={styles.logo}>
        <JobLogo src={draft.logo} name={draft.name} className={styles.img} />
      </div>
      <div className={styles.title}>{draft.name}</div>
      <StatusTitle draft={draft} />
    </MediaWrapper>
  );
}

Item.propTypes = {
  draft: draftProps.isRequired,
  isMobile: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNotify: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};
