import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Editor from 'draft-js-plugins-editor';
import createMentionPlugin from 'draft-js-mention-plugin';

import { ReactComponent as Arrow } from '@expandorg/uikit/assets/arrow-down.svg';

import VariablesTool from './variables/VariablesTool';

import TopPlaceholder from './TopPlaceholder';

import {
  suggestionsOptions,
  formatSuggestions,
  suggestionsFilter,
  SuggestionsEntry,
} from './suggest';

import {
  getText,
  hasFocus,
  isEmpty,
  editorStateFromText,
  insertVariable,
} from './content';

import styles from './DraftTextInput.module.styl';

export default class DraftTextInput extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
    autocomplete: PropTypes.arrayOf(PropTypes.string),
    resotreEntities: PropTypes.func,
    onChange: PropTypes.func,
    onSelectVar: PropTypes.func,
  };

  static defaultProps = {
    value: undefined,
    readOnly: false,
    autocomplete: [],
    resotreEntities: undefined,
    placeholder: undefined,
    className: undefined,
    onChange: Function.prototype,
    onSelectVar: null,
  };

  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin(suggestionsOptions);

    this.state = {
      autocomplete: formatSuggestions(props.autocomplete),
      value: props.value,
      editorState: editorStateFromText(props.value, props.resotreEntities),
    };
  }

  componentWillReceiveProps({ value, resotreEntities }) {
    const { value: current } = this.state;
    if (current !== value) {
      this.setState({
        value,
        editorState: editorStateFromText(value, resotreEntities),
      });
    }
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

  handleSelectVar = (variable, value) => {
    const { onSelectVar } = this.props;
    if (onSelectVar) {
      onSelectVar(variable, value);
    } else {
      const { editorState } = this.state;
      this.handleChange(insertVariable(editorState, value));
    }
  };

  render() {
    const {
      placeholder,
      className,
      readOnly,
      autocomplete: allVars,
    } = this.props;

    const { editorState, autocomplete } = this.state;

    const { MentionSuggestions } = this.mentionPlugin;

    const classes = cn(styles.container, className, {
      [styles.focus]: hasFocus(editorState),
    });

    return (
      <div className={classes}>
        <Editor
          className={styles.editor}
          readOnly={readOnly}
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
        <VariablesTool
          className={styles.dropdown}
          variables={allVars}
          onSelect={this.handleSelectVar}
        >
          {({ onToggle }) => (
            <button className={styles.vars} onClick={onToggle}>
              <Arrow />
            </button>
          )}
        </VariablesTool>
      </div>
    );
  }
}
