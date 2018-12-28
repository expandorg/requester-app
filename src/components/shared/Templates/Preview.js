import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { taskTemplateProps } from '../propTypes';

import FormPreview from '../FormPreview';

import styles from './Preview.module.styl';

export default class Preview extends Component {
  static propTypes = {
    template: taskTemplateProps,
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
        <FormPreview form={template.taskForm.form} className={styles.form} />
      </div>
    );
  }
}
