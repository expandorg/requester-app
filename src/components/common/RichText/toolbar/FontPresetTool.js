import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@gemsorg/components';

import styles from './dropdowns.module.styl';

import { fontPresets, applyFontPreset, getCurrentFontPreset } from '../content';

export default class FontPresetTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { editorState, onChange } = this.props;
    onChange(applyFontPreset(editorState, value));
  };

  render() {
    const { editorState } = this.props;
    const value = getCurrentFontPreset(editorState);

    return (
      <div className={styles.container}>
        <Dropdown
          options={fontPresets}
          value={value}
          onChange={this.handleChange}
          className={styles.dropdown}
        >
          {({ formatted }) => <div className={styles.select}>{formatted}</div>}
        </Dropdown>
      </div>
    );
  }
}
