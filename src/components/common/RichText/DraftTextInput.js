import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';

import { ReactComponent as Arrow } from '../../assets/arrow-down.svg';

import { VariablesTool } from './toolbar';

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
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    className: PropTypes.string,
    autocomplete: PropTypes.arrayOf(PropTypes.string),
    resotreEntities: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: undefined,
    autocomplete: [],
    resotreEntities: undefined,
    placeholder: undefined,
    className: undefined,
  };

  constructor(props) {
    super(props);
    this.mentionPlugin = createMentionPlugin(suggestionsOptions);
    this.state = {
      autocomplete: formatSuggestions(props.autocomplete),
      editorState: editorStateFromText(props.value, props.resotreEntities),
    };
  }

  handleChange = editorState => {
    const { onChange } = this.props;
    const value = getText(editorState);
    this.setState(() => ({ editorState }), () => onChange(value));
  };

  handleSearchChange = ({ value }) => {
    const { autocomplete } = this.props;
    this.setState({
      autocomplete: suggestionsFilter(value, autocomplete),
    });
  };

  render() {
    const { placeholder, className, autocomplete: allVars } = this.props;
    const { editorState, autocomplete } = this.state;

    const { MentionSuggestions } = this.mentionPlugin;

    const focus = hasFocus(editorState);
    return (
      <div
        className={cn(styles.container, className, { [styles.focus]: focus })}
      >
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
        />
        {!isEmpty(editorState) && (
          <TopPlaceholder
            className={styles.placeholder}
            placeholder={placeholder}
          />
        )}
        {allVars && allVars.length > 0 && (
          <VariablesTool
            className={styles.dropdown}
            variables={allVars}
            editorState={editorState}
            onChange={this.handleChange}
          >
            {({ onToggle }) => (
              <button className={styles.vars} onClick={onToggle}>
                <Arrow />
              </button>
            )}
          </VariablesTool>
        )}
      </div>
    );
  }
}
