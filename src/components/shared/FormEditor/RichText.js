import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ModuleCategories, PropControlTypes } from '@gemsorg/modules';

export default class RichText extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
  };

  static module = {
    type: 'richText',
    name: 'Rich text',
    editor: {
      category: ModuleCategories.Text,
      properties: {
        content: {
          type: PropControlTypes.richText,
          placeholder: 'Text...',
          required: true,
        },
      },
      defaults: {
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
      },
    },
  };

  render() {
    const { content } = this.props;

    /* eslint-disable react/no-danger */
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  }
}