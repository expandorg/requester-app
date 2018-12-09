import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RichUtils } from 'draft-js';

import { Dropdown } from '@gemsorg/components';

import styles from './dropdowns.module.styl';

const fonts = [
  { value: '-', label: 'Normal' },
  { value: 'BOLD', label: 'Bold' },
  { value: 'ITALIC', label: 'Italic' },
];

const getValue = editorState => {
  const style = editorState.getCurrentInlineStyle();
  if (style.has('BOLD')) {
    return 'BOLD';
  }
  if (style.has('ITALIC')) {
    return 'ITALIC';
  }
  return '-';
};

const applyFontStyle = (editorState, value) => {
  if (value === 'Bold') {
    return RichUtils.toggleInlineStyle(editorState, 'BOLD');
  }
  return editorState;
};

export default class FontStyleTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { editorState, onChange } = this.props;
    console.log(value);
    onChange(applyFontStyle(editorState, value));
  };

  render() {
    const { editorState } = this.props;
    const value = getValue(editorState);

    return (
      <div className={styles.container}>
        <Dropdown
          options={fonts}
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
