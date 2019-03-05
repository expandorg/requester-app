import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Dropdown } from '@expandorg/components';

import styles from './styles.module.styl';

export default class ModuleProperyOptionsEditor extends PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    moduleValues: PropTypes.shape({}),
    label: PropTypes.string,
    dependency: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    moduleValues: [],
    label: null,
    dependency: null,
  };

  static withModuleValues = true;

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { value, label, moduleValues, dependency } = this.props;
    const options = [...new Set(moduleValues[dependency])];
    return (
      <Dropdown
        options={options}
        label={label}
        value={value}
        onChange={this.handleChange}
        className={styles.dropdown}
      />
    );
  }
}