import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Down } from '../../../../assets/arrow_drop_down.svg';
import { ReactComponent as Up } from '../../../../assets/arrow_drop_up.svg';

import ModuleItem from './ModuleItem';

import styles from './Category.module.styl';

export default class Category extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(PropTypes.object).isRequired,
    forceOpen: PropTypes.bool.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  state = {
    expanded: true,
  };

  handleClick = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  };

  render() {
    const { name, modules, forceOpen, onEndDrag, onAdd } = this.props;
    const { expanded } = this.state;

    if (!modules.length) {
      return null;
    }
    const opened = forceOpen || expanded;
    const Icon = opened ? Up : Down;

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */

    return (
      <div className={cn(styles.container)}>
        <div className={styles.inner} onClick={this.handleClick}>
          <div className={styles.toggle}>
            <Icon
              width="10"
              height="12"
              viewBox="0 0 10 6"
              className={styles.arrowIcon}
            />
          </div>
          <div className={styles.name}>{name}</div>
        </div>
        {opened && (
          <div className={styles.list}>
            {modules.map(module => (
              <ModuleItem
                meta={module}
                key={module.type}
                onEndDrag={onEndDrag}
                onAdd={onAdd}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
