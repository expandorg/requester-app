import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { AutocompleteInput } from '@expandorg/components';

import styles from './Autocomplete.module.styl';

export default class AutocompleteContainer extends Component {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    value: '',
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
