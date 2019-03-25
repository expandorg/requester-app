import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Table as T, Button, Dropdown } from '@expandorg/components';

import styles from './Variable.module.styl';

export default class Answer extends Component {
  static propTypes = {
    answer: PropTypes.shape({
      field: PropTypes.string,
    }).isRequired,
    fields: PropTypes.arrayOf(PropTypes.string),
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fields: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      original: props.answer, // eslint-disable-line react/no-unused-state
      answer: props.answer,
      edit: false,
    };
  }

  static getDerivedStateFromProps({ answer }, state) {
    if (answer !== state.original) {
      return {
        answer,
        original: answer,
        edit: false,
      };
    }
    return null;
  }

  handleToggleEdit = evt => {
    evt.preventDefault();

    const { edit, original } = this.state;

    this.setState({
      edit: !edit,
      answer: original,
    });
  };

  handleChangeField = field => {
    this.setState(({ answer }) => ({
      answer: { ...answer, field },
    }));
  };

  handleSave = evt => {
    evt.preventDefault();

    const { onChange } = this.props;
    const { answer } = this.state;

    this.setState({ edit: false });
    onChange(answer);
  };

  render() {
    const { readOnly, fields } = this.props;
    const { answer, edit } = this.state;

    return (
      <T.HeaderCell className={styles.var}>
        <div className={styles.container}>
          {!edit && (
            <div className={styles.content}>
              <div className={styles.name}>{answer.field}</div>
              <div className={styles.type}>Answer</div>
              {!readOnly && (
                <div className={styles.actions}>
                  <Button
                    size="small"
                    theme="white-blue"
                    className={styles.edit}
                    onClick={this.handleToggleEdit}
                  >
                    edit
                  </Button>
                </div>
              )}
            </div>
          )}
          {edit && (
            <div className={cn(styles.content, styles.absolute)}>
              <div className={styles.fields}>
                <Dropdown
                  className={styles.dropdown}
                  options={fields}
                  value={answer.field}
                  onChange={this.handleChangeField}
                />
              </div>
              <div className={styles.actions}>
                <Button
                  size="small"
                  theme="white-blue"
                  className={styles.skip}
                  onClick={this.handleToggleEdit}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  className={styles.save}
                  onClick={this.handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </T.HeaderCell>
    );
  }
}
