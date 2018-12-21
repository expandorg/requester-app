import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@gemsorg/components';

import styles from './dropdowns.module.styl';

import { fontSizes, applyFontSize } from '../content';

const getValue = () => 16;

export default class FontSizeTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { editorState, onChange } = this.props;
    onChange(applyFontSize(editorState, value));
  };

  render() {
    const { editorState } = this.props;
    const value = getValue(editorState);

    return (
      <div className={styles.container}>
        <Dropdown
          options={fontSizes}
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
