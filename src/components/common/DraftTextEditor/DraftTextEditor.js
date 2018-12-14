import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import {
  Editor,
  ContentState,
  RichUtils,
  EditorState,
  convertFromHTML,
} from 'draft-js';

import FontPresetTool from './FontPresetTool';
import FontSizeTool from './FontSizeTool';
import FontStyleTool from './FontStyleTool';
import AlignmentTool from './AlignmentTool';

import styles from './DraftTextEditor.module.styl';
import './Draft.styl';

export default class DraftTextEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    // onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    placeholder: undefined,
  };

  constructor(props) {
    super(props);

    this.editor = createRef();

    const { contentBlocks, entityMap } = convertFromHTML(props.value);
    const cstate = ContentState.createFromBlockArray(contentBlocks, entityMap);

    this.state = {
      editorState: EditorState.createWithContent(cstate),
    };
  }

  handleChange = editorState => this.setState({ editorState });

  handleKeyCommand = command => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.setState({ editorState: newState });
      return 'handled';
    }
    return 'not-handled';
  };

  render() {
    const { placeholder } = this.props;
    const { editorState } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <FontPresetTool
            editorState={editorState}
            onChange={this.handleChange}
          />
          <FontSizeTool
            editorState={editorState}
            onChange={this.handleChange}
          />
          <FontStyleTool
            editorState={editorState}
            onChange={this.handleChange}
          />
          <AlignmentTool
            editorState={editorState}
            onChange={this.handleChange}
          />
        </div>
        <div className={styles.content}>
          <Editor
            ref={this.editor}
            placeholder={placeholder}
            className={styles.editor}
            editorState={editorState}
            onChange={this.handleChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}
