import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Table as T, Button, Dropdown } from '@expandorg/components';

import styles from './Answer.module.styl';

export default class Answer extends Component {
  static propTypes = {
    answer: PropTypes.shape({
      field: PropTypes.string,
    }).isRequired,
    fields: PropTypes.arrayOf(PropTypes.string),
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

  handleToggleEdit = (evt) => {
    evt.preventDefault();

    const { edit, original } = this.state;

    this.setState({
      edit: !edit,
      answer: original,
    });
  };

  handleChangeField = (field) => {
    this.setState(({ answer }) => ({
      answer: { ...answer, field },
    }));
  };

  handleSave = (evt) => {
    evt.preventDefault();

    const { onChange } = this.props;
    const { answer } = this.state;

    this.setState({ edit: false });
    onChange(answer);
  };

  render() {
    const { fields } = this.props;
    const { answer, edit } = this.state;

    return (
      <T.HeaderCell className={styles.var}>
        <div className={styles.container}>
          {!edit && (
            <div className={styles.content}>
              <div className={styles.name}>Answer</div>
              <div className={styles.type}>{answer.field}</div>
              <div className={styles.actions}>
                <Button
                  size="small"
                  theme="white"
                  className={styles.edit}
                  onClick={this.handleToggleEdit}
                >
                  select component
                </Button>
              </div>
            </div>
          )}
          {edit && (
            <div className={cn(styles.content, styles.absolute)}>
              <div className={styles.name}>Answer</div>
              <div className={styles.fields}>
                <Dropdown
                  label="Component"
                  className={styles.dropdown}
                  options={fields}
                  value={answer.field}
                  onChange={this.handleChangeField}
                />
              </div>
              <div className={styles.actions}>
                <Button
                  size="small"
                  theme="white"
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
