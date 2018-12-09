import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DraftTextEditor from '../../../../../common/DraftTextEditor/DraftTextEditor';

export default class RichTextEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    placeholder: undefined,
  };

  handleChange = value => {
    const { onChange } = this.props;
    onChange(value);
  };

  render() {
    const { placeholder, value } = this.props;
    return (
      <DraftTextEditor
        value={value}
        onChange={this.handleChange}
        placeholder={placeholder}
      />
    );
  }
}
