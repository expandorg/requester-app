import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './JsonPreview.module.styl';

export default class JsonPreview extends Component {
  static propTypes = {
    value: PropTypes.shape({}).isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { value, className } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        {JSON.stringify(
          {
            value: {
              value: { value: { value }, value1: value, value2: value },
            },
          },
          undefined,
          2
        )}
      </div>
    );
  }
}
