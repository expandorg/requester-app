import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Editor, EditorState, ContentState } from 'draft-js';

import TopPlaceholder from './TopPlaceholder';

import styles from './DraftTextInput.module.styl';

const createEditorState = value =>
  value
    ? EditorState.createWithContent(ContentState.createFromText(value))
    : EditorState.createEmpty();

const getText = editorState => editorState.getCurrentContent().getPlainText();

const isEmpty = editorState => !editorState.getCurrentContent().hasText();

const hasFocus = editorState => editorState.getSelection().getHasFocus();

// FIXME: class is uncotrolled

export default class DraftTextInput extends Component {
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

    this.state = {
      value: props.value, // eslint-disable-line react/no-unused-state
      editorState: createEditorState(props.value),
    };
  }

  handleChange = editorState => {
    const { onChange } = this.props;
    const value = getText(editorState);
    this.setState(() => ({ editorState, value }), () => onChange(value));
  };

  render() {
    const { placeholder } = this.props;
    const { editorState } = this.state;

    const focus = hasFocus(editorState);

    return (
      <div className={cn(styles.container, { [styles.focus]: focus })}>
        <Editor
          className={styles.editor}
          placeholder={placeholder}
          editorState={editorState}
          onChange={this.handleChange}
        />
        {!isEmpty(editorState) && (
          <TopPlaceholder
            className={styles.placeholder}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
}
