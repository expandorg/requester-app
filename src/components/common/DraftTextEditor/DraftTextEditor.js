import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';

import { Editor, RichUtils, EditorState } from 'draft-js';

import FontPresetTool from './FontPresetTool';
import FontSizeTool from './FontSizeTool';
import FontStyleTool from './FontStyleTool';
import AlignmentTool from './AlignmentTool';

import { getHtml, createContentState, blockStyleFn } from './content';

import styles from './DraftTextEditor.module.styl';
import './Draft.styl';

const DEBOUNCE_TIMEOUT = 150;

export default class DraftTextEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    placeholder: undefined,
  };

  constructor(props) {
    super(props);

    this.editor = createRef();

    this.saveChanges = debounce(this.saveChanges, DEBOUNCE_TIMEOUT);

    const cstate = createContentState(props.value);
    this.state = {
      editorState: EditorState.createWithContent(cstate),
    };
  }

  componentWillUnmount() {
    this.saveChanges.clear();
  }

  saveChanges = contentState => {
    const { onChange } = this.props;
    const html = getHtml(contentState);
    onChange(html);
  };

  handleChange = editorState => {
    this.setState({ editorState });
    this.saveChanges(editorState.getCurrentContent());
  };

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
          {/* <FontSizeTool
            editorState={editorState}
            onChange={this.handleChange}
          /> */}
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
            blockStyleFn={blockStyleFn}
          />
        </div>
      </div>
    );
  }
}
