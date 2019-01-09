import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { removeAtIndex, replaceAtIndex } from '@expandorg/utils';

import { DraftTextInput } from '../../../../../common/RichText';

import { ReactComponent as X } from '../../../../../assets/x.svg';

import styles from './OptionsEditor.module.styl';

export default class OptionsEditor extends Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
    variables: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: [''],
    variables: [],
  };

  handleChangeValue = (v, idx) => {
    const { onChange, value } = this.props;
    onChange(replaceAtIndex(value, idx, v));
  };

  handleRemoveClick = idx => {
    const { onChange, value } = this.props;
    onChange(removeAtIndex(value, idx));
  };

  handleAddClick = () => {
    const { onChange, value } = this.props;
    onChange([...value, '']);
  };

  render() {
    const { value, variables } = this.props;
    /* eslint-disable react/no-array-index-key */
    return (
      <div className={styles.container}>
        <DraftTextInput
          value={value[0]}
          autocomplete={variables}
          placeholder="Default Option 1"
          onChange={v => this.handleChangeValue(v, 0)}
          className={styles.default}
        />
        {value.slice(1, value.length).map((o, idx) => (
          <div className={styles.item} key={idx}>
            <DraftTextInput
              value={o}
              autocomplete={variables}
              placeholder={`Option ${idx + 2}`}
              className={styles.option}
              onChange={v => this.handleChangeValue(v, idx + 1)}
            />
            <button
              className={styles.remove}
              onClick={() => this.handleRemoveClick(idx + 1)}
            >
              <X />
            </button>
          </div>
        ))}
        <div className={styles.addContainer}>
          <button onClick={this.handleAddClick} className={styles.add}>
            <X />
          </button>
        </div>
      </div>
    );
  }
}
