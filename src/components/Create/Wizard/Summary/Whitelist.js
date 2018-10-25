import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Fieldset } from '../Form';

import styles from './Whitelist.module.styl';

export default class Whitelist extends Component {
  static propTypes = {
    filters: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        param: PropTypes.string,
        op: PropTypes.string,
        value: PropTypes.string,
      })
    ),
  };

  static defaultProps = {
    filters: [
      { id: '0', param: 'Lives', op: 'in', value: 'London' },
      { id: '1', param: 'Age', op: 'greater than', value: '35' },
      { id: '2', param: 'Studies', op: 'in', value: 'SF' },
      { id: '3', param: 'Gender', op: 'is', value: 'Female' },
    ],
  };

  render() {
    const { filters } = this.props;
    return (
      <div className={styles.container}>
        <Fieldset>
          {filters.map(condition => (
            <div key={condition.id} className={styles.condition}>
              <span className={styles.param}>{condition.param}</span>
              <span className={styles.op}>{condition.op}</span>
              <span className={styles.value}>{condition.value}</span>
            </div>
          ))}
        </Fieldset>
      </div>
    );
  }
}
