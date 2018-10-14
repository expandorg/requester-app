import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Item from './Item';
import Preview from './Preview';

import I from '../../common/I';

import styles from './Templates.module.styl';

export default class Templates extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    templates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        logo: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    selected: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
  };

  static defaultProps = {
    selected: null,
    className: null,
    title: 'Templates',
    templates: [],
  };

  render() {
    const { className, title, templates, selected, onSelect } = this.props;

    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.sidebar}>
          <div className={styles.title}>
            {title} <I tooltip={title} tooltipOrientation="right" />
          </div>
          <div className={styles.list}>
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
        <div className={styles.content}>
          <Preview template={templates.find(t => t.id === selected)} />
        </div>
      </div>
    );
  }
}
