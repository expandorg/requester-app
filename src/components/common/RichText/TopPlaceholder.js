import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { deferVisibleRender } from '@expandorg/components/hoc';

import styles from './TopPlaceholder.module.styl';

class TopPlaceholder extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    className: PropTypes.string,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: undefined,
    className: undefined,
    visible: false,
  };

  render() {
    const { visible, placeholder, className } = this.props;
    return (
      <div
        className={cn(
          styles.container,
          { [styles.visible]: visible },
          className
        )}
      >
        {placeholder}
      </div>
    );
  }
}

export default deferVisibleRender(TopPlaceholder);
