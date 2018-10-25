import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import templateProps from './templateProps';

import styles from './Preview.module.styl';

export default class Preview extends Component {
  static propTypes = {
    template: templateProps,
    className: PropTypes.string,
  };

  static defaultProps = {
    template: null,
    className: null,
  };

  render() {
    const { template, className } = this.props;
    if (!template) {
      return null;
    }

    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.title}>{template.name}</div>
        <div className={styles.logo}>
          <img className={styles.img} src={template.logo} alt={template.name} />
        </div>
        <div className={styles.description}>{template.description}</div>
      </div>
    );
  }
}
