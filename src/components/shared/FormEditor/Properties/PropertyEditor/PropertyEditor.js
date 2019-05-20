import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PropControlTypes } from '@expandorg/modules';

import StringEditor from './StringEditor';
import RichTextEditor from './RichTextEditor';
import SelectEditor from './SelectEditor';
import BoolEditor from './BoolEditor';
import OptionsEditor from './OptionsEditor';
import ModulesEditor from './ModulesEditor';
import ModuleProperyOptionsEditor from './ModuleProperyOptionsEditor';
import ImageRegionEditor from './ImageRegionEditor';
import TimelineRangeEditor from './TimelineRangeEditor';

import styles from './styles.module.styl';

const editors = {
  [PropControlTypes.number]: StringEditor,
  [PropControlTypes.boolean]: BoolEditor,
  [PropControlTypes.string]: StringEditor,
  [PropControlTypes.text]: StringEditor,
  [PropControlTypes.richText]: RichTextEditor,
  [PropControlTypes.enum]: SelectEditor,
  [PropControlTypes.modules]: ModulesEditor,
  [PropControlTypes.options]: OptionsEditor,
  [PropControlTypes.moduleProperyOptions]: ModuleProperyOptionsEditor,
  [PropControlTypes.imageRegion]: ImageRegionEditor,
  [PropControlTypes.timelineRange]: TimelineRangeEditor,
};

export default class PropertyEditor extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    property: PropTypes.object.isRequired, // eslint-disable-line
    variables: PropTypes.arrayOf(PropTypes.string),
    moduleProperties: PropTypes.any, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: [],
    moduleProperties: undefined,
  };

  handleChange = value => {
    const { name, onChange } = this.props;
    onChange(name, value);
  };

  render() {
    const {
      name,
      property: { type, ...params },
      moduleProperties,
      variables,
    } = this.props;

    const Editor = editors[type];

    if (!Editor) {
      return null;
    }

    return (
      <div className={styles.container}>
        <Editor
          variables={variables}
          value={moduleProperties[name]}
          onChange={this.handleChange}
          moduleProperties={
            Editor.withModuleProperties ? moduleProperties : undefined
          }
          {...params}
        />
      </div>
    );
  }
}
