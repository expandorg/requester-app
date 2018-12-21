import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DraftTextEditor } from '../../../../../common/RichText';

export default class RichTextEditor extends Component {
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
    const { placeholder, value, variables } = this.props;
    return (
      <DraftTextEditor
        value={value}
        autocomplete={variables}
        onChange={this.handleChange}
        placeholder={placeholder}
      />
    );
  }
}
