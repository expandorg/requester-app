import React from 'react';

import I from '../../common/I';

import { DraftStatus } from '../../../model/enums';
import { formatDate, DraftStatusTitles } from '../../../model/i18n';

import styles from './StatusTitle.module.styl';
import { draftProps } from '../../shared/propTypes';

const getTooltip = draft => {
  if (draft.status === DraftStatus.inprogress) {
    if (draft.endDate) {
      return `Still running. Task is due to end on ${formatDate(
        draft.endDate
      )}.`;
    }
  }
  if (draft.status === DraftStatus.scheduled) {
    return `Scheduled for ${formatDate(draft.startDate)}`;
  }
  return null;
};

export default function StatusTitle({ draft }) {
  const tooltip = getTooltip(draft);

  return (
    <div className={styles.status}>
      {DraftStatusTitles[draft.status]}
      {tooltip && (
        <I
          className={styles.check}
          tooltip={tooltip}
          tooltipOrientation="right"
        />
      )}
    </div>
  );
}

StatusTitle.propTypes = {
  draft: draftProps.isRequired,
};
