import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Tooltip } from '@expandorg/components';

import { ReactComponent as Checkmark } from '@expandorg/uikit/assets/checkmark.svg';
import { taskTemplateProps } from '../shared/propTypes';

import styles from './SidebarItem.module.styl';

class SidebarItem extends Component {
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

export default Tooltip(SidebarItem);
