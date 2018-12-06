import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Item from './Item';
import Preview from './Preview';

import { taskTemplateProps } from '../propTypes';

import I from '../../common/I';

import styles from './Templates.module.styl';

export default class Templates extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    templates: PropTypes.arrayOf(taskTemplateProps),
    selected: PropTypes.string,
    actions: PropTypes.element,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
    className: null,
    description: null,
    actions: null,
    title: 'Templates',
    templates: [],
  };

  render() {
    const {
      className,
      title,
      templates,
      description,
      selected,
      onSelect,
      actions,
    } = this.props;

    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.sidebar}>
          <div className={styles.title}>
            {title}
            <I
              className={styles.i}
              tooltip={description}
              tooltipOrientation="right"
            />
          </div>
          <div className={styles.list}>
            <div className={styles.inner}>
              {templates.map(template => (
                <Item
                  key={template.id}
                  template={template}
                  selected={template.id === selected}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.preview}>
            <Preview template={templates.find(t => t.id === selected)} />
          </div>
          {actions}
        </div>
      </div>
    );
  }
}
