import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';

import TopPlaceholder from './TopPlaceholder';

import {
  suggestionsOptions,
  formatSuggestions,
  suggestionsFilter,
  SuggestionsEntry,
} from './suggest';
import { getText, hasFocus, isEmpty, editorStateFromText } from './content';

import styles from './DraftTextInput.module.styl';

// FIXME: class is uncotrolled
export default class DraftTextInput extends Component {
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

    this.state = {
      autocomplete: formatSuggestions(props.autocomplete),
      editorState: editorStateFromText(props.value),
    };
  }

  handleChange = editorState => {
    const { onChange } = this.props;
    const value = getText(editorState);
    this.setState(() => ({ editorState, value }), () => onChange(value));
  };

  handleSearchChange = ({ value }) => {
    const { autocomplete } = this.props;
    this.setState({
      autocomplete: suggestionsFilter(value, autocomplete),
    });
  };

  handleAddSuggest = () => {};

  render() {
    const { placeholder } = this.props;
    const { editorState, autocomplete } = this.state;

    const { MentionSuggestions } = this.mentionPlugin;

    const focus = hasFocus(editorState);
    return (
      <div className={cn(styles.container, { [styles.focus]: focus })}>
        <Editor
          className={styles.editor}
          placeholder={placeholder}
          editorState={editorState}
          plugins={[this.mentionPlugin]}
          onChange={this.handleChange}
        />
        <MentionSuggestions
          onSearchChange={this.handleSearchChange}
          suggestions={autocomplete}
          entryComponent={SuggestionsEntry}
          onAddMention={this.handleAddSuggest}
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
