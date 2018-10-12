import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { moduleProps } from '@gemsorg/modules';

import Empty from './Empty';

import styles from './Form.module.styl';

export default class Form extends Component {
  static propTypes = {
    modules: PropTypes.arrayOf(moduleProps),
  };

  static defaultProps = {
    modules: [],
  };

  render() {
    const { modules } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.title}>Task Module</div>
        <div className={styles.content}>
          {modules.length === 0 && <Empty />}
        </div>
      </div>
    );
  }
}
