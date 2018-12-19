import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { deferVisibleRender } from '@gemsorg/components/hoc';
import styles from './TopPlaceholder.module.styl';

class TopPlaceholder extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    placeholder: undefined,
    visible: false,
  };

  render() {
    const { visible, placeholder } = this.props;
    return (
      <div className={cn(styles.container, { [styles.visible]: visible })}>
        {placeholder}
      </div>
    );
  }
}

export default deferVisibleRender(TopPlaceholder);
