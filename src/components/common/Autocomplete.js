import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { AutocompleteInput } from '@gemsorg/components';

import styles from './Autocomplete.module.styl';

export default class AutocompleteContainer extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, ...rest } = this.props;

    return (
      <AutocompleteInput
        {...rest}
        className={cn(styles.autocomplete, className)}
      />
    );
  }
}
