import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { range } from '@gemsorg/utils/src/immutable';

import Value from './Value';
import ValuesRow from './ValuesRow';

export default class Loading extends Component {
  static propTypes = {
    columns: PropTypes.number.isRequired,
    pageSize: PropTypes.number,
  };

  static defaultProps = {
    pageSize: 10,
  };

  render() {
    const { columns, pageSize } = this.props;

    return (
      <>
        {range(pageSize).map(row => (
          <ValuesRow key={row}>
            {range(columns).map(c => (
              <Value key={c} />
            ))}
          </ValuesRow>
        ))}
      </>
    );
  }
}
