import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PropControlTypes } from '@gemsorg/modules';

import NumberEditor from './NumberEditor';
import StringEditor from './StringEditor';
// import SelectEditor from './SelectEditor';
import BoolEditor from './BoolEditor';

import styles from './styles.module.styl';

const editorsMap = {
  [PropControlTypes.number]: NumberEditor,
  [PropControlTypes.boolean]: BoolEditor,
  [PropControlTypes.string]: StringEditor,
  [PropControlTypes.text]: StringEditor,
  [PropControlTypes.richText]: StringEditor,
  [PropControlTypes.enum]: null,
  [PropControlTypes.modules]: null,
};

export default class PropertyEditor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired, // eslint-disable-line
    value: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
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
    } = this.props;

    const Editor = editorsMap[type];

    if (!Editor) {
      return null;
    }
    return (
      <div className={styles.container}>
        <Editor value={value} onChange={this.handleChange} {...params} />
      </div>
    );
  }
}
