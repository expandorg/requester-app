import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@gemsorg/components';

import styles from './dropdowns.module.styl';

const fonts = ['8', '12', '16', '20'];

const getValue = () => 16;

const applyFontSize = editorState => editorState;

export default class FontSizeTool extends Component {
  static propTypes = {
    editorState: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleChange = value => {
    const { editorState, onChange } = this.props;
    onChange(applyFontSize(editorState, +value));
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
