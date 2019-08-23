import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ContextMenu, ContextMenuItem } from '../../../common/ContextMenu';

import { DraftStatus } from '../../../../model/enums';
import { draftProps } from '../../../shared/propTypes';

import styles from './Menu.module.styl';

const canCopyStates = [
  DraftStatus.draft,
  DraftStatus.completed,
  DraftStatus.scheduled,
];

const canDeleteStates = [
  DraftStatus.draft,
  DraftStatus.completed,
  DraftStatus.scheduled,
];

export default function Menu({ draft, onHide, onCopy, onDelete }) {
  const canDelete = canDeleteStates.includes(draft.status);
  const canCopy = canCopyStates.includes(draft.status);

  const copy = useCallback(
    evt => {
      evt.preventDefault();
      if (canCopy) {
        onHide();
        onCopy(draft);
      }
    },
    [canCopy, draft, onCopy, onHide]
  );

  const del = useCallback(
    evt => {
      evt.preventDefault();
      if (canDelete) {
        onHide();
        onDelete(draft);
      }
    },
    [canDelete, draft, onDelete, onHide]
  );

  const dupcs = cn(styles.button, { [styles.disabled]: !canCopy });
  const delcs = cn(styles.button, { [styles.disabled]: !canDelete });

  return (
    <ContextMenu onHide={onHide}>
      <ContextMenuItem onClick={copy} className={dupcs} disabled={!canCopy}>
        Copy
      </ContextMenuItem>
      <ContextMenuItem onClick={del} className={delcs} disabled={!canDelete}>
        Delete
      </ContextMenuItem>
    </ContextMenu>
  );
}

Menu.propTypes = {
  draft: draftProps.isRequired,
  onHide: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
