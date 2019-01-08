import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import nanoid from 'nanoid';

import { removeAtIndex, replaceAtIndex } from '@expandorg/utils/src/immutable';

import Condition from './Condition';

import { ReactComponent as X } from '../../../../assets/x.svg';
import { ReactComponent as Preview } from '../../../../assets/preview.svg';

import styles from './UserFilter.module.styl';

export const newCondition = () => ({
  id: nanoid(),
  param: undefined,
  op: undefined,
  value: undefined,
});

export default class UserFilter extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        param: PropTypes.string,
        op: PropTypes.string,
        value: PropTypes.string,
      })
    ),
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    filters: [],
    className: null,
  };

  handleRemove = index => {
    const { onChange, filters } = this.props;
    onChange(removeAtIndex(filters, index));
  };

  handleChange = (condition, index) => {
    const { onChange, filters } = this.props;
    onChange(replaceAtIndex(filters, index, condition));
  };

  handleAdd = evt => {
    const { onChange, filters } = this.props;
    onChange([...filters, newCondition()]);

    evt.preventDefault();
  };

  render() {
    const { filters, className } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        {filters.length !== 0 && (
          <>
            <div className={styles.list}>
              {filters.map((c, index) => (
                <Condition
                  key={c.id}
                  index={index}
                  condition={c}
                  onRemove={this.handleRemove}
                  onChange={this.handleChange}
                />
              ))}
            </div>
            <div className={styles.actions}>
              <button className={styles.xbtn} onClick={this.handleAdd}>
                <X className={styles.x} />
              </button>
            </div>
          </>
        )}
        {filters.length === 0 && (
          <div className={styles.empty}>
            <div className={styles.preview}>
              <Preview
                className={styles.previewIocn}
                width="144"
                height="144"
                viewBox="0 0 64 48"
              />
            </div>
            <div className={styles.centered}>
              <button className={styles.add} onClick={this.handleAdd}>
                Add condition
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
