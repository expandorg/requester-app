import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { moduleProps } from '@expandorg/modules';

import { Button } from '@expandorg/components';
import { ReactComponent as Bulb } from '@expandorg/uikit/assets/bulb.svg';

import { WalkthroughPin, ToggleWalkthrough } from '@expandorg/components/app';

import PreviewCtx from './PreviewCtx';

import styles from './Toolbar.module.styl';

export default function Toolbar({
  modules,
  title,
  onCancel,
  onSave,
  varsSample,
}) {
  return (
    <div className={styles.actions}>
      <div className={styles.previewContainer}>
        <PreviewCtx modules={modules} variables={varsSample}>
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
      </div>
      <div className={styles.title}>Edit {title} Module</div>
      <div className={styles.buttons}>
        <ToggleWalkthrough>
          {({ onToggle, enabled }) => (
            <button
              className={cn(styles.toggle, { [styles.enabled]: enabled })}
              onClick={onToggle}
              id="gems-toggle"
            >
              <Bulb width={13} height={15} viewBox="0 0 9 15" />
            </button>
          )}
        </ToggleWalkthrough>
        <WalkthroughPin id="toggle" className={styles.togglePin} />
        <Button theme="grey" className={styles.btn} onClick={onCancel}>
          Cancel
        </Button>
        <Button className={styles.btn} onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
Toolbar.propTypes = {
  modules: PropTypes.arrayOf(moduleProps).isRequired,
  title: PropTypes.string.isRequired,
    varsSample: PropTypes.object, // eslint-disable-line
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

Toolbar.defaultProps = {
  varsSample: null,
};
