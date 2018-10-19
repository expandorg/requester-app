import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './StepsForm.module.styl';

import AddNew from './AddNew';

export default class StepsForm extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired, // eslint-disable-line
    onAdd: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { onAdd, className } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.list}>
          <AddNew onAdd={onAdd} />
        </div>
      </div>
    );
  }
}
