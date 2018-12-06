import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@gemsorg/components';

import { taskTemplateProps } from '../propTypes';

import { ReactComponent as Checkmark } from '../../assets/checkmark.svg';

import styles from './Item.module.styl';

class Item extends Component {
  static propTypes = {
    template: taskTemplateProps.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  handleClick = evt => {
    evt.preventDefault();
    const { template, onSelect } = this.props;
    onSelect(template.id);
  };

  render() {
    const { children, template, selected, onSelect, ...rest } = this.props;
    return (
      <button
        className={cn(styles.container, { [styles.selected]: selected })}
        onClick={this.handleClick}
        {...rest}
      >
        <div className={styles.name}>{template.name}</div>
        {selected && <Checkmark className={styles.checkmark} />}
        {children}
      </button>
    );
  }
}

export default Tooltip(Item);
