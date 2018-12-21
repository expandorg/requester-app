import React, { Component } from 'react';
import PropTypes from 'prop-types';

import debounce from 'debounce';

import { RichUtils } from 'draft-js';

import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';

import { FontStyleTool, AlignmentTool, FontPresetTool } from './toolbar';

import { suggestionsOptions, suggestionsFilter } from './suggest';
import { getHtml, editorStateFromHtml, blockStyleFn } from './content';

import styles from './DraftTextEditor.module.styl';

const DEBOUNCE_TIMEOUT = 150;

// FIXME: class is uncotrolled
export default class DraftTextEditor extends Component {
  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    autocomplete: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    autocomplete: [],
    placeholder: undefined,
  };

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin(suggestionsOptions);

    this.saveChanges = debounce(this.saveChanges, DEBOUNCE_TIMEOUT);

    this.state = {
      autocomplete: props.autocomplete,
      editorState: editorStateFromHtml(props.value),
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

  handleSearchChange = ({ value }) => {
    const { autocomplete } = this.props;
    this.setState({
      autocomplete: suggestionsFilter(value, autocomplete),
    });
  };

  handleAddSuggest = (...args) => {
    console.log(...args);
  };

  render() {
    const { placeholder } = this.props;
    const { editorState, autocomplete } = this.state;

    const { MentionSuggestions } = this.mentionPlugin;

    return (
      <div className={styles.container}>
        <div className={styles.toolbar}>
          <FontPresetTool
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
            placeholder={placeholder}
            className={styles.editor}
            editorState={editorState}
            plugins={[this.mentionPlugin]}
            onChange={this.handleChange}
            handleKeyCommand={this.handleKeyCommand}
            blockStyleFn={blockStyleFn}
          />
          <MentionSuggestions
            onSearchChange={this.handleSearchChange}
            suggestions={autocomplete}
            onAddMention={this.handleAddSuggest}
          />
        </div>
      </div>
    );
  }
}
