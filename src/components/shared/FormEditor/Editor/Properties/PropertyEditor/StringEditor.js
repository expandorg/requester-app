import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DraftTextInput } from '../../../../../common/RichText';
import { restoreVariables } from './restoreVariables';

import styles from './styles.module.styl';

export default class StringEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    variables: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    variables: [],
    placeholder: undefined,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { value, placeholder, variables } = this.props;

    return (
      <DraftTextInput
        className={styles.input}
        autocomplete={variables}
        value={value}
        resotreEntities={restoreVariables}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}
