import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PropControlTypes } from '@gemsorg/modules';

import StringEditor from './StringEditor';
import RichTextEditor from './RichTextEditor';
import SelectEditor from './SelectEditor';
import BoolEditor from './BoolEditor';
import OptionsEditor from './OptionsEditor';

import styles from './styles.module.styl';

const editorsMap = {
  [PropControlTypes.number]: StringEditor,
  [PropControlTypes.boolean]: BoolEditor,
  [PropControlTypes.string]: StringEditor,
  [PropControlTypes.text]: StringEditor,
  [PropControlTypes.richText]: RichTextEditor,
  [PropControlTypes.enum]: SelectEditor,
  [PropControlTypes.modules]: null,
  options: OptionsEditor,
};

export default class PropertyEditor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired, // eslint-disable-line
    variables: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    value: undefined,
  };

  handleChange = value => {
    const { name, onChange } = this.props;
    onChange(name, value);
  };

  render() {
    const {
      property: { type, ...params },
      value,
      variables,
    } = this.props;

    const Editor = editorsMap[type];

    if (!Editor) {
      return null;
    }
    return (
      <div className={styles.container}>
        <Editor
          variables={variables}
          value={value}
          onChange={this.handleChange}
          {...params}
        />
      </div>
    );
  }
}
