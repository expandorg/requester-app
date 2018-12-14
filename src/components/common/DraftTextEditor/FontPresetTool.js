import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@gemsorg/components';

import styles from './dropdowns.module.styl';

const presets = ['h1', 'h2', 'h3', 'body'];

const getValue = () => 'body';

const applyFontPresrt = editorState => editorState;

export default class FontPresetTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { editorState, onChange } = this.props;
    onChange(applyFontPresrt(editorState, +value));
  };

  render() {
    const { editorState } = this.props;
    const value = getValue(editorState);

    return (
      <div className={styles.container}>
        <Dropdown
          options={presets}
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
