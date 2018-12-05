import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Editor, EditorState } from 'draft-js';

import styles from './RichTextEditor.module.styl';

export default class RichTextEditor extends Component {
  static propTypes = {
    // value: PropTypes.string,
    placeholder: PropTypes.string,
    // onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    //   value: undefined,
    placeholder: undefined,
  };

  constructor(props) {
    super(props);

    this.state = { editorState: EditorState.createEmpty() };
  }

  handleChange = editorState => this.setState({ editorState });

  render() {
    const { placeholder } = this.props;
    return (
      <Editor
        placeholder={placeholder}
        className={styles.input}
        editorState={this.state.editorState}
        onChange={this.handleChange}
      />
    );
  }
}
