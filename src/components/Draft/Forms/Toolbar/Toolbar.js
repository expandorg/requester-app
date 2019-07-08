import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Button } from '@expandorg/components';
import { WalkthroughPin, ToggleWalkthrough } from '@expandorg/components/app';
import { ReactComponent as Bulb } from '../../../../assets/bulb.svg';

import PreviewCtx from './PreviewCtx';

import { Bottombar } from '../../../shared/FormEditor/Layout';
import { draftProps } from '../../../shared/propTypes';

import styles from './Toolbar.module.styl';

export default function Toolbar({ draft, onNext }) {
  return (
    <Bottombar>
      <div className={styles.previewContainer}>
        <PreviewCtx draft={draft}>
          {({ onPreview }) => (
            <Button
              theme="aqua"
              className={styles.btn}
              onClick={onPreview}
              id="gems-preview"
            >
              Preview
            </Button>
          )}
        </PreviewCtx>
        <WalkthroughPin id="preview" className={styles.previewPin} />
        <ToggleWalkthrough>
          {({ onToggle, enabled }) => (
            <button
              className={cn(styles.toggle, { [styles.enabled]: enabled })}
              onClick={onToggle}
              id="gems-toggle"
            >
              <Bulb width="14" height="20" viewBox="0 0 14 20" />
            </button>
          )}
        </ToggleWalkthrough>
        <WalkthroughPin id="toggle" className={styles.togglePin} />
      </div>
      <div className={styles.buttons}>
        <Button className={styles.btn} onClick={onNext}>
          Next
        </Button>
      </div>
    </Bottombar>
  );
}
Toolbar.propTypes = {
  draft: draftProps.isRequired,
  onNext: PropTypes.func.isRequired,
};