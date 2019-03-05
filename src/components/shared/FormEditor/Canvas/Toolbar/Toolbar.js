import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@expandorg/modules';

import { Button } from '@expandorg/components';

import { WalkthroughPin } from '@expandorg/components/app';

import PreviewCtx from './PreviewCtx';
import Walkthrough from './Walkthrough';

import styles from './Toolbar.module.styl';

export default class Toolbar extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps).isRequired,
    title: PropTypes.string.isRequired,
    varsSample: PropTypes.object, // eslint-disable-line
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    varsSample: null,
  };

  render() {
    const { modules, title, onCancel, onSave, varsSample } = this.props;

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
          <Walkthrough />
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
}
