import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { ReactComponent as Arrow } from '@expandorg/uikit/assets/arrow-2.svg';

import ModuleItem from './ModuleItem';

import styles from './Category.module.styl';

export default class Category extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(PropTypes.object).isRequired,
    preview: PropTypes.string,
    forceOpen: PropTypes.bool.isRequired,
    offset: PropTypes.number.isRequired,
    onEndDrag: PropTypes.func.isRequired,
    onPreview: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  };

  static defaultProps = {
    preview: null,
  };

  state = {
    expanded: true,
  };

  handleClick = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  };

  render() {
    const {
      name,
      modules,
      forceOpen,
      onEndDrag,
      onPreview,
      preview,
      offset,
      onAdd,
    } = this.props;
    const { expanded } = this.state;

    if (!modules.length) {
      return null;
    }

    /* eslint-disable jsx-a11y/click-events-have-key-events  */
    /* eslint-disable jsx-a11y/no-static-element-interactions  */

    const opened = forceOpen || expanded;
    return (
      <div className={cn(styles.container, { [styles.opened]: opened })}>
        <div className={styles.inner} onClick={this.handleClick}>
          <div className={styles.toggle}>
            <Arrow
              width="13"
              height="13"
              viewBox="0 0 13 8"
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
                offset={offset}
                isHovered={module.type === preview}
                onPreview={onPreview}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
